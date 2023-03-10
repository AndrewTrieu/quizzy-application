import * as topicService from "../../services/topicService.js";
import { validasaur } from "../../deps.js";

const validationRules = {
  name: [validasaur.required, validasaur.minLength(1)],
};

const addTopic = async ({ request, response, render, state }) => {
  const userId = (await state.session.get("user")).id;
  const admin = (await state.session.get("user")).admin;
  const body = request.body({ type: "form-data" });
  const params = await body.value;
  const topicData = {
    admin: admin,
    name: params.get("name"),
  };
  const [passes, errors] = await validasaur.validate(
    topicData,
    validationRules
  );

  if (!passes || !admin) {
    response.status = 422;
    topicData.errors = errors;
    if (!admin) {
      topicData.errors = { admin: { error: "You are not an admin!" } };
    }
    topicData.topics = await topicService.getAllTopics();
    render("topics.eta", topicData);
  } else {
    await topicService.addTopic(userId, topicData.name);
    response.redirect("/topics");
  }
};

const deleteTopic = async ({ params, response, state }) => {
  const topicId = params.tId;
  const admin = (await state.session.get("user")).admin;
  if (admin) {
    await topicService.deleteTopic(topicId);
  }
  response.redirect("/topics");
};

const listTopics = async ({ render, state }) => {
  const user = await state.session.get("user");
  render("topics.eta", {
    admin: user.admin,
    allTopics: await topicService.getAllTopics(),
  });
};

export { addTopic, deleteTopic, listTopics };
