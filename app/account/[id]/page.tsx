"use client"

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getAccountDetails, updateAccountDetails } from "../../../utils/api";
import styles from "../../../styles/Account.module.css";
import { UserData } from "@/utils/interfaces";
import FollowButton from "@/components/follow";
import FollowersList from "@/components/followerslist";
import FollowingList from "@/components/followinglist";

export default function Account() {
  const [userData, setUserData] = useState<UserData|null>({bio:'',email:'',username:'',isAccountOwner:false,followers:[],following:[],userId:''});
 const [newBio, setNewBio] = useState("");
  const router = useRouter();
  const { id  } = useParams();

  useEffect(() => {
    if (id) {
      const fetchAccountDetails = async () => {
        try {
          const data = await getAccountDetails(id as string);
          setUserData(data);
        } catch (err:any) {
          alert(err.message);
        }
      };
      fetchAccountDetails();
    }
  }, [id]);

  const handleUpdate = async () => {
    try {
      await updateAccountDetails(id as string, { bio: newBio });
      alert("Bio updated");
      setUserData((prevState) => ({ ...prevState!, bio: newBio }));
    } catch (err:any) {
      alert(err.message);
    }
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1>{userData.username}'s Account</h1>
      <p>Email: {userData.email}</p>
      <p>Bio: {userData.bio}</p>
{ userData.isAccountOwner &&  
<>      <textarea
        className={styles.input}
        value={newBio}
        onChange={(e) => setNewBio(e.target.value)}
        placeholder="Update your bio"
      />
      <button className={styles.button} onClick={handleUpdate}>Update Bio</button>
   
</>   

   }
   { !userData.isAccountOwner &&  
<>     <FollowButton userId={userData.userId} followingId={id as string}/>

</>   

   }
   
 {userData.userId &&<>
  <FollowersList userId={id as string} />
  <FollowingList userId={id as string} /></>}
    </div>
  );
}
