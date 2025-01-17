"use client";

import { useState } from "react";
import { followUser, unfollowUser } from "@/utils/api";
import styles from "@/styles/Account.module.css";

export default function FollowButton({ userId,followingId }: { userId: string,followingId:string }) {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = async () => {
    try {
      await followUser(userId,followingId);
      setIsFollowing(true);
    } catch (err) {
      alert(err);
    }
  };

  const handleUnfollow = async () => {
    try {
      await unfollowUser(userId,followingId);
      setIsFollowing(false);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <button className={styles.button} onClick={isFollowing ? handleUnfollow : handleFollow}>
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
}
