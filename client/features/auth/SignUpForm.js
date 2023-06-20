// import React, { useState } from 'react';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import doc from 'firebase/firestore'
// import { db, auth } from '../../../config/firebase';

// const SignUp = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [username, setUsername] = useState('');

//   const signUp = (e) => {
//     e.preventDefault();
//     createUserWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         const user = userCredential.user;

//         // Create a new user document in Firestore
//         const userRef = db.collection('users').doc(user.uid);
//         userRef.set({
//           email,
//           firstName,
//           lastName,
//           username,
//         })
//         .then(() => {
//           console.log('User document created successfully!');
//           // You can perform additional actions after user creation, such as navigating to the user's profile
//         })
//         .catch((error) => {
//           console.log('Error creating user document:', error);
//         });
//       })
//       .catch((error) => {
//         console.log('Error signing up:', error);
//       });
//   };



//   return (
//     <div className="sign-up-container">
//       <form onSubmit={signUp}>
//         <h1>Create an Account</h1>
//         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
//         <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
//         <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//   );
// };

// export default SignUp;


// function signup(email, password) {
//   return createUserWithEmailAndPassword(auth, email, password).then(
//     (cred) => {
//       const data = {
//         email: email,
//         favoriteCards: [];
//       };
//       const newUser = doc(db, `users/${cred.user.uid}`);
//       setDoc(newUser, data);
//     }
//   );
// }
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../config/firebase';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        const userRef = doc(db, `users/${user.uid}`);
        const data = {
          email: email,
          streakCounter: 0,
          firstName: firstName,
          lastName: lastName,
          username: username
        };

        setDoc(userRef, data)
          .then(() => {
            console.log('User document created successfully!');
            // You can perform additional actions after user creation, such as navigating to the user's profile
          })
          .catch((error) => {
            console.log('Error creating user document:', error);
          });
      })
      .catch((error) => {
        console.log('Error signing up:', error);
      });
  };

  return (
    <div className="sign-up-container">
      <form onSubmit={signUp}>
        <h1>Create an Account</h1>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
