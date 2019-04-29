
let scriptTarget = 'dev';
if (process.env.NODE_ENV == 'production') {
  scriptTarget = 'prod';
}

let watchTarget = false;
if (process.env.NODE_ENV == 'development') {
  watchTarget = true;
}

module.exports = {
  apps : [{
    name: "BlooGraph",
    script: "npm run " + scriptTarget,
    watch: watchTarget
  }]
}
