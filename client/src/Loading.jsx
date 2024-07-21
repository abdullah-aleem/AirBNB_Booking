import React from 'react'

function Loading() {
    return (
        <div className="flex  justify-center h-screen ">
          <div className="w-12 h-12 border-4 border-dotted rounded-full animate-spin-slow  border-primary"></div>
        </div>
      );
}

export default Loading