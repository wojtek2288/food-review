#!/usr/bin/env bash
set -e

if [ "$#" -ne 1 ]; then
    echo "Illegal number of parameters, please specify only migration name"
else
    source ../config/config.sh
    echo "Config applied"

    echo "Adding migration"
    dotnet ef --startup-project ../../src/Apps/FoodReview.Api/FoodReview.Api.csproj \
    --project ../../src/Core/FoodReview.Core.Services/FoodReview.Core.Services.csproj migrations add $1

    echo "All done"
fi

