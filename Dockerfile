FROM node:lts

WORKDIR /app

COPY . .

RUN npm install

# ENV MONGO_URI=mongodb+srv://iamrusydee:8HjhYMhjH0kK6UWP@devscalemongo.8yn9ne7.mongodb.net/?retryWrites=true&w=majority&appName=devscaleMongo
# ENV PORT=8000
# ENV JWT_REFRESH_TOKEN=OlL+0mY1mDCihfgLPbdG5LNMltifaq7vvQj0CFII3G4=
# ENV JWT_ACCESS_TOKEN=IdGWDVYZuXvG0U6UZrn9XHQ6nWG6OgLIZ6GT7g4lFtAAEsYZkz6Rwx8wFLpOi5GaZj9LwQ/TbIvQEAflgu6Qog==

EXPOSE 8000

CMD ["npm", "run", "start"]
