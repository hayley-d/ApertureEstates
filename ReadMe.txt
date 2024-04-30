Default Login Details
----------------------------------------------------------
Email: email@proton.me
Password: 123456Woo*

Password Requirements:
----------------------------------------------------------
Requiring passwords to be at least 8 characters in length ensures that the password is generally secure, as the increase in character length
increases the number of possible combinations, making the password harder to crack through brute force attacks.
Having a mix of upper and lowercase letters, digits, and symbols increases the complexity of the password and adds to the total number of possible combinations.

Argon2i Hashing
----------------------------------------------------------
This hashing algorithm was chosen as it is commonly used for hashing passwords.
The Argon2i algorithm requires a significant amount of memory to compute, which helps protect against parallel attacks because it requires attackers to use a large amount of memory as well.
Argon2i was designed to be resistant to side-channel attacks.
Argon2i is highly configurable, allowing for the adjustment of parameters such as time cost, memory cost, and parallelism factor to suit the specific needs of the developer.

API Key
----------------------------------------------------------
The generateApiKey function generates a random API key containing alphanumeric characters.
The function defines a string of characters that includes all possible alphanumeric characters.
The function then initializes an empty variable called apiKey to store the generated key.
Using a for loop that iterates 16 times to generate a 16-digit API key, in each iteration, it appends a random character from the characters string to the apiKey variable.
The rand(0,strlen($characters)-1) function generates a random index within the range of 0 to the length of the characters string. This index is used to select the random character.
The function then returns the 16-digit API key consisting of random alphanumeric characters.
