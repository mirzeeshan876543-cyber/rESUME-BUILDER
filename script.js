// Step 1: connect each form input to the place where its text appears on the resume.
// Each pair is [input id, output id].
const textFields = [
  ["name", "outName"],
  ["title", "outTitle"],
  ["summary", "outSummary"],
];

// Step 2: turn a block of text into list items (one per line or comma).
// textContent is used (not innerHTML) so typed HTML can't break the page.
function fillList(listId, items) {
  const list = document.getElementById(listId);
  list.innerHTML = "";                       // clear the old list
  items.forEach(function (item) {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

// Split text by a separator, trim spaces, and remove empty pieces
function splitClean(text, separator) {
  return text
    .split(separator)
    .map(function (part) { return part.trim(); })
    .filter(function (part) { return part !== ""; });
}

// Step 3: update the whole resume from the form values
function updateResume() {
  // simple text fields
  textFields.forEach(function (pair) {
    document.getElementById(pair[1]).textContent =
      document.getElementById(pair[0]).value;
  });

  // contact line: email and phone joined together
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  document.getElementById("outContact").textContent =
    [email, phone].filter(Boolean).join("  |  ");

  // lists
  fillList("outSkills", splitClean(document.getElementById("skills").value, ","));
  fillList("outEducation", splitClean(document.getElementById("education").value, "\n"));
  fillList("outProjects", splitClean(document.getElementById("projects").value, "\n"));

  // accent color: change the CSS variable and everything follows
  document.documentElement.style.setProperty(
    "--accent",
    document.getElementById("color").value
  );
}

// Step 4: run updateResume every time the user types or picks something.
// "input" fires on every keystroke, so the preview is live.
document.getElementById("editor").addEventListener("input", updateResume);

// Step 5: the print button opens the browser's print dialog.
// Choose "Save as PDF" there to download your resume.
document.getElementById("printBtn").addEventListener("click", function () {
  window.print();
});

// Fill the resume once when the page first loads
updateResume();
