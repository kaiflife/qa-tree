function renderTreeFromObject(treeData) {
  function buildTree(node) {
    const ul = document.createElement("ul");
    ul.className = "tree";

    // Проходим по всем ключам текущего уровня объекта
    for (const key of Object.keys(node)) {
      const li = document.createElement("li");
      const value = node[key];

      // Если значение — это объект (и не массив), значит есть вложенные узлы
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        const details = document.createElement("details");
        details.open = false;
        const summary = document.createElement("summary");
        const spanValue = document.createElement("span");

        spanValue.className = "value";
        spanValue.innerText = key;
        summary.appendChild(spanValue);

        details.appendChild(summary);

        // Рекурсивный вызов для построения вложенной структуры
        const childUl = buildTree(value);
        details.appendChild(childUl);

        li.appendChild(details);
      } else {
        // Если значение — строка/число, это конечный элемент (leaf)
        const span = document.createElement("span");
        span.className = "leaf";

        const spanKey = document.createElement("span");
        spanKey.className = "key";
        spanKey.innerText = `${key}: `;

        const spanValue = document.createElement("span");
        spanValue.className = "value";
        spanValue.innerText = value;

        span.append(spanKey, spanValue);

        li.appendChild(span);
      }

      ul.appendChild(li);
    }

    return ul;
  }

  const rootElement = buildTree(treeData);
  document.body.appendChild(rootElement);
}

(async () => {
  try {
    const tree = await fetch("tree.json").then((res) => res.json());
    renderTreeFromObject(tree);
  } catch (e) {
    console.error("Ошибка загрузки или парсинга JSON:", e);
  }
})();
