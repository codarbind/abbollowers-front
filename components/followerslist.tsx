"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getFollowers } from "@/utils/api";
import styles from "@/styles/Account.module.css";

interface Follower {
    id: string
    "createdAt":string
    "active": boolean
    "follower": {
        "id": string
        "email":string
        "username": string
        "bio": string
    }
}

export default function FollowersList({ userId }: { userId: string }) {
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const data = await getFollowers(userId);

        setFollowers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, [userId]);

  if (loading) return <p>Loading followers...</p>;
  if (followers.length === 0) return <p>No followers yet.</p>;

  return (
    <div className={styles.listContainer}>
      <h2>Followers</h2>
      <ul className={styles.list}>
        {followers.map((user) => (
          <li key={user.id} className={styles.listItem}>
            <Link href={`/account/${user.follower.id}`} className={styles.link}>
              {user.follower.username}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
