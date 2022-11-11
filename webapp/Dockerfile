# Use official node image as the base image
FROM node:latest as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install --legacy-peer-deps

# Generate the build of the application
RUN npm run build --omit=dev

# Use official nginx image as the base image
FROM nginx:latest

ENV API_BASE_URL $API_BASE_URL

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/webapp /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY ./run-nginx.sh /usr/share/nginx/run-nginx.sh
RUN chmod +x /usr/share/nginx/run-nginx.sh

CMD ["sh", "/usr/share/nginx/run-nginx.sh"]

# Expose port 80
EXPOSE 80