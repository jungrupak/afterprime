import React from 'react'

export function useTodayDate() {
    const updatedDate = new Date();
    const formatted = updatedDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
  return formatted;
}
