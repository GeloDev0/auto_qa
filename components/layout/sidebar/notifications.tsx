"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { GoBellFill } from "react-icons/go";

type Notification = {
  id: number;
  message: string;
  read: boolean;
  createdAt: string;
  user: {
    name: string;
    imageUrl?: string;
  };
  project?: {
    User_Project_createdByIdToUser?: {
      name: string;
      imageUrl: string;
    };
  };
};

export default function NotificationDropdown({ userId }: { userId: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [markingAllRead, setMarkingAllRead] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleDropdown = () => {
  setIsOpen((prev) => !prev);
};

  const markAllAsRead = async () => {
    setMarkingAllRead(true);
    try {
      await fetch("/api/notifications/mark-read", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

       // Artificial 2-second delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updated = notifications.map((n) => ({ ...n, read: true }));
      setNotifications(updated);
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    } finally {
      setMarkingAllRead(false);
    }
  };

  const markOneAsRead = async (notifId: number) => {
    try {
      await fetch(`/api/notifications/${notifId}/read`, {
        method: "POST",
      });
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notifId ? { ...n, read: true } : n
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  useEffect(() => {
  if (!userId) return;

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`/api/notifications?userId=${userId}` 
      // , {
      //   headers: {
      //     "Cache-Control": "no-cache",
      //   },
      // }
      );
      const data = await res.json();
      setNotifications(data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  fetchNotifications();

  // ⏳ Polling disabled for now — uncomment to re-enable
  // const interval = setInterval(() => {
  //   fetchNotifications(); // Poll every 5 seconds
  // }, 5000);

  // return () => clearInterval(interval); // Cleanup on unmount
}, [userId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={toggleDropdown}
        className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-200 focus:outline-none relative"
        aria-label="Toggle notifications dropdown"
      >
        <GoBellFill className="w-4 h-4 text-yellow-400" />
        {unreadCount > 0 && !isOpen && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-[380px] bg-white rounded-2xl shadow-xl ring-1 ring-black/10 z-50 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <GoBellFill className="w-4 h-4 text-yellow-400" />
              Notifications
            </p>
             <button
              onClick={markAllAsRead}
              disabled={markingAllRead}
              className="text-sm text-blue-500 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed flex items-center gap-1"
            >
              {markingAllRead ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Marking...
                </>
              ) : (
                "Mark all as read"
              )}
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.filter((n) => !n.read).length === 0 && (
  <p className="p-4 text-center text-gray-500">
    No notifications
  </p>
)}

            {notifications
  .filter((notif) => !notif.read)
  .map((notif) => {
              const creator = notif.project?.User_Project_createdByIdToUser;
              const creatorName =
                creator?.name || notif.user?.name || "Unknown User";
              const creatorImage =
                creator?.imageUrl || notif.user?.imageUrl || null;

              return (
                <div
                  key={notif.id}
                  onClick={() => markOneAsRead(notif.id)}
                  className={`flex items-start gap-3 px-5 py-4 border-b border-gray-100 hover:bg-blue-50 cursor-pointer ${
                    !notif.read ? "bg-yellow-50" : ""
                  }`}
                >
                  {creatorImage ? (
                    <img
                      src={creatorImage}
                      alt={creatorName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-semibold">
                      {creatorName[0] || "U"}
                    </div>
                  )}

                  <div className="flex-1">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">{creatorName}</span>{" "}
                      {notif.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(notif.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent parent click
                      markOneAsRead(notif.id);
                    }}
                    className="text-gray-300 hover:text-gray-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="px-5 py-3 text-center text-sm">
            <a href="#" className="text-blue-600 hover:underline">
              View all notifications
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
