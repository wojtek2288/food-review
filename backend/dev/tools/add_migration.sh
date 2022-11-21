#!/usr/bin/env bash
set -e

if [ "$#" -ne 1 ]; then
    echo "Illegal number of parameters, please specify only migration name"
else
    # TODO: check how to export connection string with new way of handling env variables
    # You can change from GetStringFromEnvVariable to GetString in Config.cs when adding migration
    # and uncomment line below and it should work
    export connectionString='Server=mssql.local.pl;Database=FoodReview;User Id=sa;Password=Passw12#;Encrypt=false'
    echo "Adding migration"
    dotnet ef --startup-project ../../src/Apps/FoodReview.Api/FoodReview.Api.csproj \
    --project ../../src/Core/FoodReview.Core.Services/FoodReview.Core.Services.csproj migrations add $1 --context CoreDbContext 

    echo "All done"
fi

