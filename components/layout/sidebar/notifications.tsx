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
  };
};

export default function NotificationDropdown({ userId }: { userId: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleDropdown = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        markAllAsRead();
      }
      return next;
    });
  };

  const markAllAsRead = () => {
    // Locally mark as read
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);

    // TODO: Add backend call to mark notifications as read if needed
  };

  useEffect(() => {
    if (!userId) return;

    const fetchNotifications = async () => {
      try {
        const res = await fetch(`/api/notifications?userId=${userId}`);
        if (!res.ok) {
          console.error("Failed to fetch notifications", await res.text());
          return;
        }
        const data: Notification[] = await res.json();
        setNotifications(data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, [userId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
              className="text-sm text-blue-500 hover:underline"
            >
              Mark all as read
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 && (
              <p className="p-4 text-center text-gray-500">No notifications</p>
            )}

            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`flex items-start gap-3 px-5 py-4 border-b border-gray-100 hover:bg-blue-50 ${
                  !notif.read ? "bg-yellow-50" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-semibold">
                  {notif.user?.name?.[0] || "U"}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">
                      {notif.user?.name || "Unknown User"}
                    </span>{" "}
                    {notif.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(notif.createdAt).toLocaleString()}
                  </p>
                </div>
                <button className="text-gray-300 hover:text-gray-500">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
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