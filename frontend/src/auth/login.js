const login = async (formData) => {
  //   const formData = new FormData({ username, password,roles });

  try {
    const response = await fetch("http://127.0.0.1:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: formData,
    });

    if (response.status == 200) {
      return { message: "login successful!" };
    } else {
      return { message: "Login failed!" };
    }
  } catch (error) {
    return { error: error.message };
  }
};

export default login;
