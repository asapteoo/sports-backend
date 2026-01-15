const bcrypt = require("bcrypt");

// Example user password
const plainPassword = "mySuperSecret123";

async function testHash() {
  // Hash the password
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  console.log("Plain password:", plainPassword);
  console.log("Hashed password:", hashedPassword);

  // Simulate login: user enters password
  const loginPassword = "mySuperSecret123"; // try changing this to test wrong password
  const match = await bcrypt.compare(loginPassword, hashedPassword);

  if (match) {
    console.log("Login successful ✅ Password matches hashed password");
  } else {
    console.log("Login failed ❌ Password does not match");
  }
}

testHash();
