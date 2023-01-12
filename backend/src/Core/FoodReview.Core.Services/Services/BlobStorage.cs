using Azure.Storage;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Azure.Storage.Sas;
using FoodReview.Core.Services.Configuration;

namespace FoodReview.Core.Services;

public class BlobStorage
{
    private const string UserPhotosContainer = "user-photos";
    private readonly BlobServiceClient blobClient;
    private readonly StorageSharedKeyCredential credentials;

    public BlobStorage(BlobStorageConfiguration config)
    {
        blobClient = new BlobServiceClient(config.ConnectionString);
        var parts = BlobStorageConnectionStringParser.Parse(config.ConnectionString);
        credentials = new(parts["AccountName"], parts["AccountKey"]);
    }

    public virtual async Task<BlobContainerClient> GetUserPhotosContainerAsync(CancellationToken ct = default)
    {
        var container = blobClient.GetBlobContainerClient(UserPhotosContainer);
        await container.CreateIfNotExistsAsync(publicAccessType: PublicAccessType.BlobContainer, cancellationToken: ct);
        return container;
    }

    public virtual async Task<BlobClient> GetUserPhotoBlobClientAsync(
        Guid userId,
        string extension,
        CancellationToken ct = default)
    {
        var container = await GetUserPhotosContainerAsync(ct);
        return container.GetBlobClient($"{userId}.{extension}");
    }

    public virtual string GetBlobWriteAccessLink(BlobClient blob)
    {
        var builder = new BlobSasBuilder()
        {
            StartsOn = DateTimeOffset.UtcNow.AddMinutes(-10),
            ExpiresOn = DateTimeOffset.UtcNow.AddHours(1),
            BlobContainerName = blob.BlobContainerName,
            BlobName = blob.Name,
            Resource = "b",
        };

        builder.SetPermissions(BlobSasPermissions.All);

        return new BlobUriBuilder(blob.Uri)
        {
            Sas = builder.ToSasQueryParameters(credentials),
        }.ToString();
    }
}
