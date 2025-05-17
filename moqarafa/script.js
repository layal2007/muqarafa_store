// ✅ تسجيل الدخول وتخزين اسم المستخدم
function login() {
  const username = document.getElementById("username").value.trim();
  if (username === "") {
    alert("من فضلك أدخل اسم المستخدم");
    return;
  }
  localStorage.setItem("username", username);
  window.location.href = "dashboard.html";
}

// ✅ عرض الترحيب باسم المستخدم
window.onload = function () {
  const welcome = document.getElementById("welcomeMessage");
  if (welcome) {
    const username = localStorage.getItem("username") || "زائر";
    welcome.innerHTML = `<span class="greeting">مرحبًا</span> <span class="username">${username}</span> 👋`;
  }

  const isBuyer = localStorage.getItem("hasPurchased") === "true";

  if (isBuyer) {
    loadExchangeBooks(); // ✅ عرض كتب المقايضة
    showExchangeFormIfPurchased(); // ✅ إظهار النموذج
  } else {
    const exchangeContainer = document.getElementById("exchangeBooksContainer");
    exchangeContainer.innerHTML = `
      <div class="warning-box">
        <p>❌ هذا القسم مخصص فقط للمستخدمين الذين سبق لهم الشراء من المتجر.</p>
        <p>🛍️ قم بشراء أي كتاب لتفعيل ميزة المقايضة الأدبية.</p>
      </div>
    `;
  }
};


// ✅ دالة تفعيل الشراء (وهمية للتجربة)
function markUserAsBuyer() {
  localStorage.setItem("hasPurchased", "true");
  alert("✅ تم تسجيلك كمشتري! أعدي تحميل الصفحة.");
  location.reload();
}


// ✅ عرض كتب المزاج
// ✅ عرض الكتب حسب الحالة المزاجية
function showBooksByMood() {
  const mood = document.getElementById("moodSelector").value;
  const container = document.getElementById("moodBooksContainer");
  container.innerHTML = "";

  const books = {
    happy: [
      { title: "سعيد بذاتي", author: "ماريسا تايلور", price: "28 ريال", cover: "assets/happy_ar1.jpg" },
      { title: "ضحكات الأيام", author: "محمد السالم", price: "30 ريال", cover: "assets/happy_ar2.jpg" },
      { title: "Happy Within", author: "Marisa Taylor", price: "32 SAR", cover: "assets/happy_en1.jpg" },
      { title: "The School of Life: Calm", author: "Alain de Botton", price: "36 SAR", cover: "assets/happy_en2.jpg" }
    ],
    sad: [
      { title: "أرض البرتقال الحزين", author: "غسان كنفاني", price: "26 ريال", cover: "assets/sad_ar1.jpg" },
      { title: "بيروت بلوز", author: "حنان الشيخ", price: "27 ريال", cover: "assets/sad_ar2.jpg" },
      { title: "Feeling Good", author: "David D. Burns", price: "35 SAR", cover: "assets/sad_en1.jpg" },
      { title: "Before the Queen Falls Asleep", author: "Huzama Habayeb", price: "29 SAR", cover: "assets/sad_en2.jpg" }
    ],
    calm: [
      { title: "هذا الكتاب سيجعلك هادئًا", author: "سيزمي هيبرد", price: "33 ريال", cover: "assets/calm_ar1.jpg" },
      { title: "تأملات هادئة", author: "عبد الله العتيبي", price: "30 ريال", cover: "assets/calm_ar2.jpg" },
      { title: "Calm", author: "Alain de Botton", price: "34 SAR", cover: "assets/calm_en1.jpg" },
      { title: "The Little Book of Calm", author: "Paul Wilson", price: "28 SAR", cover: "assets/calm_en2.jpg" }
    ],
    excited: [
      { title: "في مدح الكراهية", author: "خالد خليفة", price: "30 ريال", cover: "assets/excited_ar1.jpg" },
      { title: "الاعترافات", author: "ربيع جابر", price: "32 ريال", cover: "assets/excited_ar2.jpg" },
      { title: "The Prophet", author: "Kahlil Gibran", price: "38 SAR", cover: "assets/excited_en1.jpg" },
      { title: "Frankenstein in Baghdad", author: "Ahmed Saadawi", price: "36 SAR", cover: "assets/excited_en2.jpg" }
    ]
  };

  books[mood]?.forEach(book => {
    const div = document.createElement("div");
    div.classList.add("book");
    div.innerHTML = `
      <img src="${book.cover}" alt="${book.title}" />
      <h3>${book.title}</h3>
      <p>${book.author}</p>
      <p><strong>${book.price}</strong></p>
      <div class="button-container">
        <button class="buy-btn" onclick="buyBook('${book.title}')">🛒 شراء</button>
      </div>
    `;
    container.appendChild(div);
  });
}


// ✅ عند الشراء
function buyBook(bookTitle) {
  alert(`📦 تم شراء "${bookTitle}" بنجاح!`);
  localStorage.setItem("hasPurchased", "true");
  showExchangeFormIfPurchased();
}

// ✅ عرض نموذج إضافة المقايضة بعد الشراء
function showExchangeFormIfPurchased() {
  const form = document.getElementById("addExchangeForm");
  const hasPurchased = localStorage.getItem("hasPurchased") === "true";
  if (form) {
    form.style.display = hasPurchased ? "block" : "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  showExchangeFormIfPurchased();
});




// ✅ تحميل كتب المقايضة
function loadExchangeBooks() {
  const books = [
    { title: "كتاب بلا ثمن", author: "مجهول", cover: "assets/exchange1.jpg" },
    { title: "تبادل معك", author: "قارئ مثلك", cover: "assets/exchange2.jpg" }
  ];

  const container = document.getElementById("exchangeBooksContainer");
  if (!container) return;

  container.innerHTML = ""; // تنظيف أولاً

  books.forEach(book => {
    const div = document.createElement("div");
    div.classList.add("book");
    div.innerHTML = `
      <img src="${book.cover}" alt="${book.title}" />
      <h3>${book.title}</h3>
      <p>${book.author}</p>
      <p><strong>📗 متاح للمقايضة</strong></p>
    `;
    container.appendChild(div);
  });
}

// ✅ إضافة كتاب جديد للمقايضة
function addExchangeBook() {
  const title = document.getElementById("exchangeTitle")?.value.trim();
  const author = document.getElementById("exchangeAuthor")?.value.trim();
  const cover = document.getElementById("exchangeCover")?.value.trim();

  if (!title || !author || !cover) {
    alert("يرجى تعبئة جميع الحقول.");
    return;
  }

  const container = document.getElementById("exchangeBooksContainer");

  const book = document.createElement("div");
  book.classList.add("book");
  book.innerHTML = `
    <img src="${cover}" alt="${title}" />
    <h3>${title}</h3>
    <p>${author}</p>
    <p><strong>مقايضة</strong></p>
  `;

  container.appendChild(book);

  // تنظيف الحقول
  document.getElementById("exchangeTitle").value = "";
  document.getElementById("exchangeAuthor").value = "";
  document.getElementById("exchangeCover").value = "";
}

// ✅ محادثة الكاتب
function sendMessage() {
  const input = document.getElementById("userMessage");
  const message = input.value.trim();
  if (message === "") return;

  const chatLog = document.getElementById("chatLog");
  const username = localStorage.getItem("username");
}
