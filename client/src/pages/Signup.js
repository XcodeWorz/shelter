import React, { useState } from "react";
import { Card, Form, Button, Row, Col, Image } from "react-bootstrap";
import ImageUploader from "react-images-upload";
import axios from "axios";

function Signup() {
  const [image, setImage] = useState();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleImage = (image) => {
    setImage(image[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const createUser = () => {
    let data = new FormData();
    data.append("name", values.name);
    data.append("email", values.email);
    data.append("password", values.password);
    data.append("confirmPassword", values.confirmPassword);
    data.append("image", image);

    axios
      .post("http://localhost:5000/signup", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="gradient-bg full-height d-flex align-items-center justify-content-center">
      <Card className="form-card p-5">
        <Row>
          <Col
            sm={5}
            className="d-flex justify-content-center align-items-center"
          >
            <Image src="http://localhost:5000/public/house.png" alt="logo" />
          </Col>
          <Col sm={7}>
            <Form className="px-4">
              <ImageUploader
                withPreview
                singleImage
                buttonText="Add Profile Image"
                onChange={handleImage}
                withLabel={false}
              />
              <h3 className="text-center text-success"> Sign Up</h3>
              <Form.Group>
                <Form.Control
                  name="name"
                  value={values.name}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  placeholder="Name"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  name="email"
                  value={values.email}
                  type="email"
                  placeholder="Email"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  value={values.confirmPassword}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Button onClick={createUser} variant="outline-success" block>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default Signup;
