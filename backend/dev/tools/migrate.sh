#!/usr/bin/env bash
set -e

source /app/code/dev/config/config.sh
echo "Config applied"

echo "Migrating CoreDbContext"
dotnet ef --startup-project ./src/Apps/FoodReview.Api/FoodReview.Api.csproj \
--project ./src/Core/FoodReview.Core.Services/FoodReview.Core.Services.csproj database update --context CoreDbContext

echo "Migrating PersistedGrantDbContext"
dotnet ef --startup-project ./src/Apps/FoodReview.Api/FoodReview.Api.csproj \
--project ./src/Core/FoodReview.Core.Services/FoodReview.Core.Services.csproj database update --context PersistedGrantDbContext

echo "All done"
