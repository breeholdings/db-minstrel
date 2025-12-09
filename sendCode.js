async function sendVerificationCode() {
    const email = document.getElementById("email").value;
    const fullName = document.getElementById("fullName").value;
    const stageName = document.getElementById("stageName").value;
    const password = document.getElementById("password").value;

    if(!email || !password){
        alert("Fill in all fields!");
        return;
    }

    // Generate 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000);

    // Save signup info + code temporarily
    localStorage.setItem("pendingSignup", JSON.stringify({
        fullName, stageName, email, password, code
    }));

    // SEND EMAIL THROUGH BREVO API
    await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
            "accept": "application/json",
            "api-key": "YOUR_BREVO_API_KEY_HERE",
            "content-type": "application/json"
        },
        body: JSON.stringify({
            sender: { name: "D&B Minstrel", email: "no-reply@yourdomain.com" },
            to: [{ email: email }],
            subject: "Your D&B Minstrel Verification Code",
            htmlContent: `
                <h2>Welcome to D&B Minstrel!</h2>
                <p>Your verification code is:</p>
                <h1 style="letter-spacing:3px;">${code}</h1>
                <p>Enter this code to verify your email.</p>
            `
        })
    });

    // Move to verification page
    window.location.href = "verify.html";
}
