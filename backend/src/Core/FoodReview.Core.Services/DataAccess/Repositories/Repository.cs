using FoodReview.Core.Domain.Common;
using Microsoft.EntityFrameworkCore;

namespace FoodReview.Core.Services.DataAccess.Repositories;

public abstract class Repository<T> where T : class, IAggregateRoot
{
    protected CoreDbContext DbContext { get; }
    protected DbSet<T> DbSet { get; }

    protected Repository(CoreDbContext dbContext)
    {
        DbContext = dbContext;
        DbSet = dbContext.Set<T>();
    }

    public async Task AddAsync(T entity, CancellationToken ct = default)
    {
        DbSet.Add(entity);
        await DbContext.SaveChangesAsync(ct);
    }

    public async Task DeleteAsync(T entity, CancellationToken ct = default)
    {
        DbSet.Remove(entity);
        await DbContext.SaveChangesAsync(ct);
    }

    public async Task UpdateAsync(T entity, CancellationToken ct = default)
    {
        DbSet.Update(entity);
        await DbContext.SaveChangesAsync(ct);
    }

    public Task<T?> FindAsync(Guid id, CancellationToken ct = default)
    {
        return DbSet.FirstOrDefaultAsync(x => x.Id == id, ct);
    }

    public Task<T> FindAndEnsureExistsAsync(Guid id, CancellationToken ct = default)
    {
        return DbSet.FirstAsync(x => x.Id == id, ct);
    }
}
