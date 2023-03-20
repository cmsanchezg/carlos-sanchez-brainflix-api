const express = require("express");
const router = express.Router();
const fs = require("fs");
const { url } = require("inspector");
const { URL } = require("url");
const { v4: uuid } = require("uuid");

function readVideosData() {
    const videosFile = fs.readFileSync("./data/videos.json");
    const videosData = JSON.parse(videosFile);
    return videosData;
}

function writeVideoData(data) {
    const stringifiedData = JSON.stringify(data);
    fs.writeFileSync("./data/videos.json",stringifiedData);
}

router.get ("/videos", (request, response) => {
    const videosData = readVideosData();

    const strippedData =  videosData.map((video) => {
        return {
            id: video.id,
            title: video.title,
            channel: video.channel,
            image: video.image,
        };
    });
    // console.log("got request")
    response.status(200).json(strippedData);
});

router.get ("/videos/:id", (request, response) => {
    const videosData = readVideosData();

    const individualData =  videosData.find((video) => video.id === request.params.id);
    response.status(200).json(individualData);
});


router.post("/videos", (require, response) => {
    const videoData = readVideosData();

    const newVideo = {
        id: uuid(),
        title: require.body.title,
        channel: "Sanchez Tech.",
        image: "http://localhost:8090/images/atlas_campeon.jpg",
        description: require.body.description,
        views: "246,802",
        likes: "135,790",
        duration: "5:00",
        video: require.body.video,
        timestamp: Date.now(),
        comments: [{
            id: uuid(),
            name: "Carlos Sanchez",
            comment: "Hey!, it works!",
            likes: "123",
            timestamp: Date.now(),
        }],
    };
    videoData.push(newVideo);
    writeVideoData(videoData);
    response.status(201).send();
}),

module.exports = router;