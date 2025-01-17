"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getFollowings } from "@/utils/api";
import styles from "@/styles/Account.module.css";

interface Following {
 
            id: string
            "createdAt":string
            "active": boolean
            "following": {
                "id": string
                "email":string
                "username": string
                "bio": string
            }
    
}

export default function FollowingList({ userId }: { userId: string }) {
  const [following, setFollowing] = useState<Following[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const data = await getFollowings(userId);
        setFollowing(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowing();
  }, [userId]);

  if (loading) return <p>Loading following...</p>;
  if (following.length === 0) return <p>Not following anyone yet.</p>;

  return (
    <div className={styles.listContainer}>
      <h2>Following</h2>
      <ul className={styles.list}>
        {following.map((user) => (
          <li key={user.id} className={styles.listItem}>
            <Link href={`/account/${user.following.id}`} className={styles.link}>
              {user.following.username}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
