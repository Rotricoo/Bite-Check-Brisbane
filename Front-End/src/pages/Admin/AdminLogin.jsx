import { useState } from "react";

// Import components
import { loginAdmin } from "../../services/adminAPI.js";
import CreateReviewForm from "./AdminTools/createReviewForm/CreateReviewForm.jsx";
import UpdateReviewTool from "./AdminTools/UpdateReviewTool/UpdateReviewTool.jsx";
import DeleteReviewTool from "./AdminTools/DeleteReviewTool/DeleteReviewTool.jsx";

// Import styles
import "./AdminLogin.scss";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [selectedAction, setSelectedAction] = useState("");

  async function handleLoginSubmit(event) {
    event.preventDefault();

    const isAdmin = await loginAdmin(email, password);

    if (isAdmin) {
      setIsLoggedIn(true);
      setLoginError("");
      return;
    }

    setLoginError("Invalid admin login.");
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setSelectedAction("");
    setEmail("");
    setPassword("");
  }

  if (isLoggedIn) {
    return (
      <main className="admin-login">
        <section className="admin-login__panel">
          <div className="admin-login__header">
            <p className="admin-login__eyebrow">Admin area</p>
            <h1 className="admin-login__title">Manage reviews</h1>
            <p className="admin-login__text">Choose what you want to do with Bite Check review posts.</p>
          </div>

          <div className="admin-login__actions">
            <button
              className={`admin-login__action-button ${selectedAction === "create" ? "admin-login__action-button--active" : ""}`}
              type="button"
              onClick={() => setSelectedAction("create")}
            >
              Create post
            </button>

            <button
              className={`admin-login__action-button ${selectedAction === "update" ? "admin-login__action-button--active" : ""}`}
              type="button"
              onClick={() => setSelectedAction("update")}
            >
              Update post
            </button>

            <button
              className={`admin-login__action-button ${selectedAction === "delete" ? "admin-login__action-button--active" : ""}`}
              type="button"
              onClick={() => setSelectedAction("delete")}
            >
              Delete post
            </button>
          </div>

          <div className="admin-login__workspace">
            {!selectedAction && (
              <section className="admin-login__tool">
                <p className="admin-login__eyebrow">Dashboard</p>
                <h2 className="admin-login__subtitle">Choose an admin action</h2>
                <p className="admin-login__text">Create, update, or delete Bite Check review posts.</p>
              </section>
            )}

            {selectedAction === "create" && <CreateReviewForm onBack={() => setSelectedAction("")} />}
            {selectedAction === "update" && <UpdateReviewTool onBack={() => setSelectedAction("")} />}
            {selectedAction === "delete" && <DeleteReviewTool onBack={() => setSelectedAction("")} />}
          </div>

          <button className="admin-login__logout-button" type="button" onClick={handleLogout}>
            Log out
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-login">
      <section className="admin-login__panel">
        <div className="admin-login__header">
          <p className="admin-login__eyebrow">Admin area</p>
          <h1 className="admin-login__title">Bite Check login</h1>
        </div>

        <form className="admin-login__form" onSubmit={handleLoginSubmit}>
          <label className="admin-login__field">
            <span className="admin-login__label">Email</span>
            <input className="admin-login__input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>

          <label className="admin-login__field">
            <span className="admin-login__label">Password</span>
            <input className="admin-login__input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </label>

          {loginError && <p className="admin-login__error">{loginError}</p>}

          <button className="admin-login__submit-button" type="submit">
            Log in
          </button>
        </form>
      </section>
    </main>
  );
}

export default AdminLogin;
