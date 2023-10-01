# Use an official Maven image as the base
FROM maven:3.8.3-openjdk-11 AS build

# Set the working directory in the container
WORKDIR /app

# Copy your source code and pom.xml into the container
COPY . .

# Build the Spring Boot application using Maven
RUN mvn package -DskipTests

# Use a smaller image for runtime
FROM openjdk:11-jre-slim

# Set the working directory in the container
WORKDIR /app

# Copy the compiled application from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port your Spring Boot application is listening on (default is 8080)
EXPOSE 8080

# Define the command to run your Spring Boot application
CMD ["java", "-jar", "app.jar"]
