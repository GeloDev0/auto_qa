import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { GoBellFill } from "react-icons/go";

const initialNotifications = [
  {
    id: 1,
    user: "Sara Jhonson",
    action: "added a new project",
    link: "WebApp QA Phase 2",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    user: "Nick Jonas",
    action: "created a new test case",
    link: "Verify Email Validation",
    time: "10 min ago",
    read: true,
  },
  {
    id: 3,
    user: "Matt Hardy",
    action: "requested to upgrade plan",
    type: "action",
    read: false,
  },
  {
    id: 4,
    user: "Lorem Ipsum",
    action: "updated test case",
    link: "Login with Invalid Password",
    time: "20 min ago",
    read: true,
  },
  {
    id: 5,
    user: "Lorem Ipsum",
    action: "deleted project",
    link: "Old Android App Tests",
    time: "20 min ago",
    read: false,
  },
];

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleDropdown = () => {
    setIsOpen((prev) => {
      const next = !prev;
      // Mark as read on open
      if (next) {
        setNotifications((prevNotifs) =>
          prevNotifs.map((n) => ({ ...n, read: true }))
        );
      }
      return next;
    });
  };

  const markAllAsRead = () => {
    setNotifications((prevNotifs) =>
      prevNotifs.map((n) => ({ ...n, read: true }))
    );
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={toggleDropdown}
        className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-200 focus:outline-none relative"
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
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className="flex items-start gap-3 px-5 py-4 border-b border-gray-100 hover:bg-blue-50"
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-semibold">
                  {notif.user[0]}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">{notif.user}</span>{" "}
                    {notif.action}{" "}
                    {notif.link && (
                      <span className="text-blue-600 font-medium hover:underline cursor-pointer">
                        {notif.link}
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                  {notif.type === "action" && (
                    <div className="mt-2 flex gap-2">
                      <button className="text-sm px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Accept
                      </button>
                      <button className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
                        Decline
                      </button>
                    </div>
                  )}
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
