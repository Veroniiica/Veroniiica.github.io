const assets = {
  cloud: "./assets/cloud.png",
  portfolio: "./assets/portfolio.png",
  navigation: "./assets/navigation.png",
  scrollArrow: "./assets/scroll-arrow.png",
  dot: "./assets/dot.svg",
};

const cloudNames = ["cloud1", "cloud5", "cloud7", "cloud4", "cloud6", "cloud3", "cloud2"];
const stageSize = { width: 1920, height: 1993 };

function createImage(src, alt = "") {
  const image = document.createElement("img");
  image.src = src;
  image.alt = alt;
  image.draggable = false;
  return image;
}

function createCloud(name) {
  const cloud = document.createElement("div");
  cloud.className = `cloud ${name}`;
  cloud.dataset.name = name;

  const viewport = document.createElement("div");
  viewport.className = "cloud-viewport";
  viewport.append(createImage(assets.cloud));
  cloud.append(viewport);

  return cloud;
}

function createPortfolioWord() {
  const frame = document.createElement("div");
  frame.className = "portfolio";
  frame.append(createImage(assets.portfolio, "Portfolio"));
  return frame;
}

function createNavigationArrow() {
  const wrapper = document.createElement("div");
  wrapper.className = "nav-wrap";
  wrapper.append(createImage(assets.navigation, "Navigation arrow"));
  return wrapper;
}

function createHeadline(text, className) {
  const headline = document.createElement("p");
  headline.className = `headline ${className}`;
  headline.textContent = text;
  return headline;
}

function createDot() {
  const dot = document.createElement("span");
  dot.className = "dot";
  dot.setAttribute("aria-hidden", "true");
  dot.append(createImage(assets.dot));
  return dot;
}

function createIntro() {
  const intro = document.createElement("section");
  intro.className = "intro";
  intro.setAttribute("aria-label", "Portfolio specialties");

  const title = document.createElement("p");
  title.className = "intro-title";
  title.textContent =
    "Designing complex enterprise systems for high-stakes decision making";

  const tags = document.createElement("ul");
  tags.className = "tag-list";
  ["Enterprise SaaS", "Data Dashboards", "Financial Platforms", "Inquiry & Transaction Systems"].forEach(
    (label, index) => {
      if (index > 0) tags.append(createDot());

      const item = document.createElement("li");
      item.textContent = label;
      tags.append(item);
    },
  );

  intro.append(title, tags);
  return intro;
}

function createScrollDownGroup() {
  const group = document.createElement("div");
  group.className = "scroll-down-group";
  group.setAttribute("aria-label", "Scroll down");

  const label = document.createElement("span");
  label.textContent = "Scroll down";

  const arrow = createImage(assets.scrollArrow);
  arrow.className = "scroll-arrow";

  group.append(arrow, label);
  return group;
}

function createSectionHeading(title, subtitle) {
  const heading = document.createElement("div");
  heading.className = "section-heading";

  const titleEl = document.createElement("p");
  titleEl.textContent = title;

  const subtitleEl = document.createElement("p");
  subtitleEl.textContent = subtitle;

  heading.append(titleEl, subtitleEl);
  return heading;
}

function createTextBlock(lines) {
  const block = document.createElement("div");
  block.className = "text-block";

  lines.forEach((line) => {
    const item = document.createElement("p");
    item.textContent = line;
    block.append(item);
  });

  return block;
}

function createTimelineItem(date, title, subtitle) {
  const item = document.createElement("div");
  item.className = "timeline-item";

  const row = document.createElement("div");
  row.className = "timeline-main";

  const dateEl = document.createElement("p");
  dateEl.textContent = date;

  const titleEl = document.createElement("p");
  titleEl.textContent = title;

  const subtitleEl = document.createElement("p");
  subtitleEl.className = "timeline-subtitle";
  subtitleEl.textContent = subtitle;

  row.append(dateEl, titleEl);
  item.append(row, subtitleEl);
  return item;
}

function createExperienceColumn(title, subtitle, items) {
  const column = document.createElement("section");
  column.className = "experience-column";
  column.append(createSectionHeading(title, subtitle));

  const list = document.createElement("div");
  list.className = "timeline-list";
  items.forEach((item) => list.append(createTimelineItem(...item)));

  column.append(list);
  return column;
}

function createAboutContent() {
  const content = document.createElement("section");
  content.className = "about-content";

  const about = document.createElement("section");
  about.className = "about-section";
  about.append(
    createSectionHeading("关于我", "About Me"),
    createTextBlock([
      "3年B端产品设计经验，专注金融科技与复杂数据系统，具备0-1全链路设计落地能力。擅长处理高密度信息与复杂业务流程，通过系统化设计提升效率与可用性。",
      "在方法上，聚焦复杂系统中的用户逻辑，通过优化信息结构与操作路径，降低高频场景下的认知负荷。",
      "在协作上，具备良好的技术理解力与组件化思维，能够提升跨团队协同效率并保证体验一致性。",
      "英语流利，适应国际化团队合作，推动项目高效落地。",
    ]),
  );

  const experience = document.createElement("div");
  experience.className = "experience-grid";
  experience.append(
    createExperienceColumn("教育经历", "Educational Path", [
      [
        "2024.2-2025.10",
        "悉尼大学 交互设计与电子艺术硕士",
        "University Of Sydney Master Of Interaction Design And Electronic Arts",
      ],
      [
        "2018.2-2020.12",
        "墨尔本皇家理工大学 视觉传达学士",
        "RMIT University Bachelor Of Communication Design",
      ],
    ]),
    createExperienceColumn("职业经历", "Career Path", [
      ["2021.9-2023.12", "花旗银行 高级交互设计师", "CITI Bank UIUX Designer"],
      ["2021.7-2021.9", "Face Car 交互设计师", "Face Car Intern Ux Designer"],
    ]),
  );

  content.append(about, experience);
  return content;
}

function buildStage() {
  const viewport = document.createElement("div");
  viewport.className = "viewport";

  const stage = document.createElement("div");
  stage.className = "stage";
  stage.append(
    ...cloudNames.map(createCloud),
    createPortfolioWord(),
    createNavigationArrow(),
    createHeadline("This is Veronica", "veronica"),
    createHeadline("Hello!", "hello"),
    createIntro(),
    createScrollDownGroup(),
    createAboutContent(),
  );

  viewport.append(stage);
  return { viewport, stage };
}

function fitStage(app, stage) {
  const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
  const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
  const scale = Math.max(viewportWidth / stageSize.width, viewportHeight / stageSize.height);
  const renderHeight = stageSize.height * scale;
  stage.style.setProperty("--stage-scale", String(scale));
  app.style.setProperty("--stage-render-height", `${renderHeight}px`);
}

function setupCloudMouseFollow(stage, viewport) {
  const clouds = [...stage.querySelectorAll(".cloud")].map((cloud, index) => ({
    node: cloud,
    strength: Math.max(0.76, 1 - index * 0.04),
    driftX: index % 2 === 0 ? 1 : 0.9,
    driftY: index % 2 === 0 ? 0.9 : 1,
  }));
  const radius = 25;
  let frameId = 0;
  let target = { x: 0, y: 0 };

  function renderClouds() {
    frameId = 0;

    clouds.forEach(({ node, strength, driftX, driftY }) => {
      const x = target.x * radius * strength * driftX;
      const y = target.y * radius * strength * driftY;
      node.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`;
    });
  }

  function resetClouds() {
    target = { x: 0, y: 0 };
    queueRender();
  }

  function queueRender() {
    if (!frameId) frameId = window.requestAnimationFrame(renderClouds);
  }

  function updateTarget(event) {
    const rect = stage.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (event.clientX - centerX) / (rect.width / 2);
    const y = (event.clientY - centerY) / (rect.height / 2);
    const length = Math.hypot(x, y);
    const limit = Math.max(1, length);

    target = {
      x: x / limit,
      y: y / limit,
    };
    queueRender();
  }

  viewport.addEventListener("pointermove", updateTarget);
  viewport.addEventListener("pointerleave", resetClouds);
  window.addEventListener("blur", resetClouds);
}

function init() {
  const app = document.querySelector("#app");
  const { viewport, stage } = buildStage();
  app.replaceChildren(viewport);

  fitStage(app, stage);
  window.addEventListener("resize", () => fitStage(app, stage));
  window.visualViewport?.addEventListener("resize", () => fitStage(app, stage));

  setupCloudMouseFollow(stage, viewport);
}

init();
