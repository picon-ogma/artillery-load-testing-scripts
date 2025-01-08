require("dotenv").config();
const { faker } = require("@faker-js/faker");

const TEST_USERS = ["jeet@appstango.com"];

const groupIds = [];

function getTokens() {
  return {
    tokens: [process.env.BEARER_TOKEN_1, process.env.BEARER_TOKEN_2],
  };
}

function selectRandomToken(context, events, done) {
  const tokens = getTokens().tokens;
  const randomIndex = Math.floor(Math.random() * tokens.length);
  context.vars.bearerToken = tokens[randomIndex];

  return done();
}

function selectRoundRobinToken(context, events, done) {
  const tokens = getTokens().tokens;
  const tokenIndex = (context.vars.$userId || 0) % tokens.length;
  context.vars.bearerToken = tokens[tokenIndex];

  return done();
}

function initializeGroupIds(context, events, done) {
  context.vars.groupIds = [];
  return done();
}

function generateGroupName(context, events, done) {
  context.vars.groupName = `Group_Test_${faker.company.name()}_${faker.string.alphanumeric(
    5
  )}`;
  return done();
}

function handleLoginResponse(req, res, context, ee, next) {
  if (res.statusCode === 200) {
    console.log(`Login successful for user: ${context.vars.email}`);
  } else {
    console.log(
      `Login failed for user: ${context.vars.email}, Status: ${res.statusCode}`
    );
  }
  return next();
}

function handleGroupResponse(req, res, context, ee, next) {
  let groupInformation;

  if (typeof res.body === "string") {
    try {
      groupInformation = JSON.parse(res.body);
    } catch (error) {
      console.error(`Unable to parse response body`);
      console.error(res.body);
    }
  } else {
    groupInformation = res.body;
  }

  if (res.statusCode === 202) {
    console.log(`Group creation success, Status: ${res.statusCode}`);
    console.log(`Group created: ${context.vars.groupId}`);
    console.log(`Message: ${groupInformation?.message}`);
  } else {
    console.log(`Group creation failed, Status: ${res.statusCode}`);
  }
  return next();
}

function handleRestaurantsResponse(req, res, context, ee, next) {
  if (res.statusCode === 200 && res.body) {
    const body = typeof res.body === "string" ? JSON.parse(res.body) : res.body;
    if (body.restaurants && Array.isArray(body.restaurants)) {
      context.vars.restaurantAddressIds = body.restaurants
        .map((r) => r.restaurantAddressId)
        .filter((id) => id);

      console.log(
        `Found ${context.vars.restaurantAddressIds.length} restaurants`
      );
    }
  }
  return next();
}

function setUserEmail(context, events, done) {
  context.vars.email =
    TEST_USERS[Math.floor(Math.random() * TEST_USERS.length)];
  return done();
}

function selectRandomGroupId(context, events, done) {
  const randomIndex = Math.floor(Math.random() * groupIds.length);
  const groupId = groupIds[randomIndex];

  context.vars.groupId = groupId;

  return done();
}

function storeGroupIds(requestParams, response, userContext, events, done) {
  const groupId = userContext.vars.groupId;
  if (groupId) {
    userContext.vars.groupIds.push(groupId);
  }

  return done();
}

function selectIconCalJwtToken(context, events, done) {
  context.vars.iconcalJwtToken = process.env.ICONCAL_JWT_TOKEN;
  return done();
}

module.exports = {
  generateGroupName,
  handleLoginResponse,
  handleGroupResponse,
  handleRestaurantsResponse,
  setUserEmail,
  selectRandomGroupId,
  initializeGroupIds,
  storeGroupIds,
  selectRandomToken,
  selectRoundRobinToken,
  selectIconCalJwtToken,
};
