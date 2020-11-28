import { React } from "react";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Button, Col, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import CookieConsent from "react-cookie-consent";
import "./login.css";

const LoginPage = () => {
  const [show, setShow] = useState(true);
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const cookieEnabled = navigator.cookieEnabled;
  let history = useHistory();

  if (!cookieEnabled) {
    alert("ENABLE YOUR GOD DAMN COOOKIES!");
  }
  useEffect(() => {});

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      fetch("http://localhost:3001/login", {
        method: "post",

        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          if (json.status === 400) {
            console.log(json);
          }

          if (json.errors) {
            alert(json.errors);
            history.push("/login");
          } else {
            const cookies = new Cookies();
            cookies.set("token", json.token, { path: "/" });
            console.log(cookies.get("token")); // Pacman
            history.push("/dashboard");
          }
        })
        .catch((err) => alert("Invalid"));
      e.preventDefault();
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="xl"
        aria-labelledby="example-modal-sizes-title-lg"
        className="signin"
      >
        <Modal.Header closeButton></Modal.Header>
        <Form onSubmit={handleSubmit} className="bateekh">
          <p>Sign In</p>
          <Form.Group as={Row} controlId="email">
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) => setform({ ...form, email: e.target.value })}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="password">
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setform({ ...form, password: e.target.value })}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 20, offset: 5 }}>
              <Button type="submit">Sign in</Button>
            </Col>
            <Col id="forgotlink" sm={{ span: 10, offset: 4 }}>
              <a href="/login">Forget Password</a>
            </Col>
          </Form.Group>
        </Form>
        <CookieConsent>
          This website uses cookies to enhance the user experience.
        </CookieConsent>
      </Modal>
    </div>
  );
};

export default LoginPage;
