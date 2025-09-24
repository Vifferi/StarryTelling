// ================================================================================================================================ Firebase Import =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } 
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc } 
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ================================================================================================================================ Firebase Config =====
const firebaseConfig = {
  apiKey: "AIzaSyBg0I0H6ID5piA15Fx1fmTRAP2SBlBBfDY",
  authDomain: "starrytelling2.firebaseapp.com",
  projectId: "starrytelling2",
  storageBucket: "starrytelling2.appspot.com",
  messagingSenderId: "519457333599",
  appId: "1:519457333599:web:cc7cc9cc27bcc2fdaf16ea"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ================================================================================================================================ DOMContentLoaded =====
document.addEventListener('DOMContentLoaded', () => {

  const wrapper = document.querySelector('.wrapper');
  const registerLink = document.querySelector('.register-link');
  const loginLink = document.querySelector('.login-link');
  const closeIcon = document.querySelector('.icon-close');
  const loginPopupBtn = document.querySelector('.btnLogin-popup');
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  // ================================================================================================================================ Popup control =====
  if(loginPopupBtn) loginPopupBtn.addEventListener('click', () => {
    wrapper.style.display = "flex";
    wrapper.classList.remove("active");
  });

  if(closeIcon) closeIcon.addEventListener('click', () => wrapper.style.display = "none");

  if(registerLink) registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    wrapper.classList.add("active");
  });

  if(loginLink) loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    wrapper.classList.remove("active");
  });

  // ================================================================================================================================ Register =====
  if(registerForm){
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = document.getElementById("registerUsername").value.trim();
      const email = document.getElementById("registerEmail").value.trim();
      const password = document.getElementById("registerPassword").value.trim();

      if(!username || !email || !password){
        alert("กรอกข้อมูลให้ครบก่อนค่ะ ✨");
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", userCredential.user.uid), {
          username: username,
          email: email,
          role: "user"
        });

        // เก็บ username ไว้ใน localStorage เพื่อใช้หน้าอื่นต่อ
        localStorage.setItem("username", username);

        alert("✅ สมัครสมาชิกสำเร็จ");
        registerForm.reset();
        wrapper.style.display = "none";

      } catch(err){
        alert("❌ Error: " + err.message);
      }
    });
  }

  // ================================================================================================================================ Login =====
  if(loginForm){
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();

      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("🎉 Login สำเร็จ");
      } catch(err){
        alert("❌ Error: " + err.message);
      }
    });
  }

  // ================================================================================================================================ Logout =====
  const logoutBtn = document.getElementById("logoutBtn");
  if(logoutBtn){
    logoutBtn.addEventListener("click", async () => {
      await signOut(auth);
      alert("👋 Logout แล้ว");
      window.location.href = "index.html";
    });
  }

  // ================================================================================================================================ Add Comment =====
commentForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if(!currentUser) return;

  const userDoc = await getDoc(doc(db, "users", currentUser.uid));
  const username = userDoc.data().username;

  await addDoc(collection(db, "comments"), {
    username,
    text: commentInput.value,
    createdAt: serverTimestamp()
  });

  commentInput.value = "";
});

// ================================================================================================================================ Show Comments =====
const commentsQuery = query(collection(db, "comments"), orderBy("createdAt", "asc"));
onSnapshot(commentsQuery, snapshot => {
  commentsList.innerHTML = "";
  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    commentsList.innerHTML += `
      <div class="comment">
        <span class="username">${data.username}</span>: ${data.text}
      </div>
    `;
  });
});

// ================================================================================================================================ Interaction JS
document.addEventListener('DOMContentLoaded', function() {
    // Notification alert
    const notification = document.querySelector('.notification');
    notification.addEventListener('click', function() {
        alert('You have 3 unread notifications');
    });
    
    // Click news cards alert
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            alert(`Opening news story: ${title}`);
        });
    });

    // Highlight WebWire items after 2s
    setTimeout(function() {
        const webwireItems = document.querySelectorAll('.webwire-item');
        webwireItems.forEach(item => {
            item.style.backgroundColor = '#f1f8ff';
        });
    }, 2000);
});

});
