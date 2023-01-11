using System.Linq.Expressions;
using System.ComponentModel;
using FoodReview.Core.Domain;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.CQRS.Extensions;

public static class IQueryableExtensions
{
    public static IQueryable<TResult> LeftJoin<TLeft, TRight, TKey, TResult>(
        this IQueryable<TLeft> left,
        IQueryable<TRight> right,
        Expression<Func<TLeft, TKey>> leftKeySelector,
        Expression<Func<TRight, TKey>> rightKeySelector,
        Expression<Func<TLeft, TRight?, TResult>> resultSelector
    )
    {
        var g = Expression.Parameter(typeof(Grouping<TLeft, TRight>), "g");
        var r = Expression.Parameter(typeof(TRight), "r");

        var keyAccessor = Expression.Property(g, Grouping<TLeft, TRight>.KeyPropertyInfo);
        var selectorInvocation = Expression.Invoke(resultSelector, keyAccessor, r);

        var lambda = Expression.Lambda<Func<Grouping<TLeft, TRight>, TRight?, TResult>>(selectorInvocation, g, r);

        return left.GroupJoin(
                right,
                leftKeySelector,
                rightKeySelector,
                (l, r) => new Grouping<TLeft, TRight> { Key = l, Values = r, }
            )
            .SelectMany(g => g.Values.DefaultIfEmpty(), lambda);
    }

    public static IEnumerable<TResult> LeftJoin<TLeft, TRight, TKey, TResult>(
        this IEnumerable<TLeft> left,
        IEnumerable<TRight> right,
        Func<TLeft, TKey> leftKeySelector,
        Func<TRight, TKey> rightKeySelector,
        Func<TLeft, TRight?, TResult> resultSelector
    )
    {
        return left.GroupJoin(
                right,
                leftKeySelector,
                rightKeySelector,
                (l, r) => new Grouping<TLeft, TRight> { Key = l, Values = r, }
            )
            .SelectMany(g => g.Values.DefaultIfEmpty(), (g, r) => resultSelector(g.Key, r));
    }

    private struct Grouping<TKey, TValue>
    {
        public TKey Key { get; set; }
        public IEnumerable<TValue> Values { get; set; }

        public static System.Reflection.PropertyInfo KeyPropertyInfo = typeof(Grouping<TKey, TValue>).GetProperty(
            nameof(Key)
        )!;
    }
    
    public static async Task<IEnumerable<T>> Sort<T>(this IQueryable<T> data, string? propertyName, string? sortDirection)
    {
        if (propertyName == null)
        {
            return data;
        }
        
        var descriptor = TypeDescriptor.GetProperties(typeof(T)).Find(propertyName, true);
        if (descriptor == null)
        {
            return data;
        }
        
        var list = await data.ToListAsync();
        return sortDirection is "asc" ? list.OrderBy(x => descriptor.GetValue(x)) 
            : list.OrderByDescending(x => descriptor.GetValue((x)));
    }
}
