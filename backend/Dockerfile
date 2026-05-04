# =============================================================
# Multi-stage build para Render.
# Stage 1: compila con JDK 25 + Maven (usamos el wrapper para no
#          depender de Maven instalado en la imagen).
# Stage 2: imagen runtime con JRE 25 — bastante más liviana.
# =============================================================

# ---------- Build stage ----------
FROM eclipse-temurin:25-jdk AS build
WORKDIR /workspace

# Cache de dependencias: copiamos primero solo los archivos que
# definen el árbol de deps. Si no cambia el pom, Docker reutiliza
# el .m2 cache de la capa anterior.
COPY mvnw mvnw.cmd ./
COPY .mvn/ .mvn/
COPY pom.xml ./
RUN chmod +x ./mvnw && ./mvnw -B -DskipTests dependency:go-offline

# Copiamos el código y empaquetamos.
COPY src/ src/
RUN ./mvnw -B -DskipTests package

# ---------- Runtime stage ----------
FROM eclipse-temurin:25-jre
WORKDIR /app

# Usuario no-root por seguridad.
RUN groupadd --system app && useradd --system --gid app app
USER app

# Copiamos el JAR final con un nombre estable.
COPY --from=build /workspace/target/*.jar app.jar

# Render inyecta PORT — Spring lo lee desde application.properties.
EXPOSE 8080

# Defaults razonables. En Render free tier (512 MB) limitamos heap.
ENV JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=70 -XX:+UseG1GC"

ENTRYPOINT ["java", "-jar", "app.jar"]
