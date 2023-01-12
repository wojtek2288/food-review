using FoodReview.Core.Contracts.Common;
using FoodReview.Core.Contracts.Mobile.Users;
using FoodReview.Core.Domain;
using FoodReview.Core.Services.CQRS.Common;
using FoodReview.Core.Services.DataAccess.Repositories;

namespace FoodReview.Core.Services.CQRS.Example;

public class PhotoUploadLinkQH : QueryHandler<PhotoUploadLink, string>
{
    private readonly BlobStorage blobStorage;
    private readonly Repository<User> users;

    public PhotoUploadLinkQH(BlobStorage blobStorage, Repository<User> users)
    {
        this.blobStorage = blobStorage;
        this.users = users;
    }

    public override async Task<string> HandleAsync(PhotoUploadLink query, CoreContext context)
    {
        var blob = await blobStorage.GetUserPhotoBlobClientAsync(
            context.UserId,
            query.Extension,
            context.CancellationToken);

        var user = await users.FindAndEnsureExistsAsync(context.UserId, context.CancellationToken);
        user.EditPhoto(blob.Uri.ToString());
        await users.UpdateAsync(user, context.CancellationToken);

        return blobStorage.GetBlobWriteAccessLink(blob);
    }
}