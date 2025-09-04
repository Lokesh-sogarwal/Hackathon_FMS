export  const Logout = async (token) => {
        if (!token) return;

        try {
            const res = await fetch("http://localhost:5000/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                credentials: "include"
            });

            const data = await res.json();
            if (res.ok) {
                localStorage.removeItem("token");
                console.log(data.message);
            } else {
                console.error("Logout failed:", data.error || "Unknown error");
            }

            // navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
}}