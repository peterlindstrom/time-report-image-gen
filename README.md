# time-report-image-gen
# Generate image out of json => html API
Using webshot to return a image based on text input

##Setup
> npm install

##Run
> node start

##API
POST http://localhost:3001/createImage

example body: {
  "table": [
    {
      "date": "2018-01-01",
      "hours": 8,
      "projectName": "TajmShit",
      "activityName": "Drink beer"
    },
    {
      "date": "2018-01-02",
      "hours": 8,
      "projectName": "TajmShit",
      "activityName": "Drink beer"
    },
    {
      "date": "2018-01-03",
      "hours": 8,
      "projectName": "TajmShit",
      "activityName": "Drink beer"
    },
    {
      "date": "2018-01-04",
      "hours": 8,
      "projectName": "TajmShit",
      "activityName": "Drink beer"
    },
    {
      "date": "2018-01-05",
      "hours": 8,
      "projectName": "TajmShit",
      "activityName": "Drink beer"
    },
    {
      "date": "2018-01-06",
      "hours": 8,
      "projectName": "TajmShit",
      "activityName": "Drink beer"
    },
    {
      "date": "2018-01-07",
      "hours": 8,
      "projectName": "TajmShit",
      "activityName": "Drink beer"
    }
  ],
  "title": "Week 1"
}

return body: {
    "outname": "outfile1391ca30-0869-11e8-b1e7-9584e89e8098.jpg"
}

GET http://localhost:3001/image/{outname} returns the jpg


