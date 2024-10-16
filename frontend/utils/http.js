import { BACKEND_URL } from "@env"
// const BACKEND_URL = "https://subexchange.site:443/api"

export async function fetchEarningHistories(googleUserId) {
    const data = new FormData();
    data.append("googleUserId", googleUserId);
    try {
      var response = await fetch(BACKEND_URL + "/get-earning-histories", {
        method: "POST",
        body: data
      });
    } catch {
      throw new Error("Network problem, check your network connection or contact us for problem. Email: subexchange@gmail.com")
    }
    
    return await response.json();
}

export async function fetchUserInfo(googleUserId) {
    const data = new FormData();
    data.append("googleUserId", googleUserId);
  
    try {
      var response = await fetch(BACKEND_URL + "/get-user-info", {
        method: "POST",
        body: data,
      });
    } catch {
      throw new Error("Network problem, check your network connection or contact us for problem. Email: subexchange@gmail.com")
    }
   

    return await response.json();
}
  
export async function fetchUploadedVideos(googleUserId) {
    const data = new FormData();
    data.append("googleUserId", googleUserId);
  
    try {
      var response = await fetch(BACKEND_URL + "/get-uploaded-videos", {
        method: "POST",
        body: data
      });
    } catch {
      throw new Error("Network problem, check your network connection or contact us for problem. Email: subexchange@gmail.com")
    }
    

    return await response.json();
}

export async function fetchInvitationRecords(googleUserId) {
    const data = new FormData();
    data.append("googleUserId", googleUserId);
  
    try {
      var response = await fetch(BACKEND_URL + "/get-invitation-records", {
        method: "POST",
        body: data
      });
    } catch {
      throw new Error("Network problem, check your network connection or contact us for problem. Email: subexchange@gmail.com")
    }

    return await response.json();
}

export async function deleteVideo(googleUserId, videoId, ) {
    const data = new FormData();
    data.append("googleUserId", googleUserId);
    data.append("videoId", videoId)

    try {
      var response = await fetch(BACKEND_URL + "/delete-video", {
        method: "POST",
        body: data
      });
    } catch {
      throw new Error("Network problem, check your network connection or contact us for problem. Email: subexchange@gmail.com")
    }
    
    return await response.json();
}

export async function uploadVideo(googleUserId, ytVideoId, desiredView, additionalActivity, desiredAdditionalActivityAmount, timePerView) {
    const data = new FormData();
    data.append("googleUserId", googleUserId);
    data.append("ytVideoId", ytVideoId)
    data.append("desiredView", desiredView)
    data.append("additionalActivity", additionalActivity)
    data.append("desiredAdditionalActivityAmount", desiredAdditionalActivityAmount)
    data.append("timePerView", timePerView)

    try {
      var response = await fetch(BACKEND_URL + "/upload-video", {
        method: "POST",
        body: data
      });
    } catch {
      throw new Error("Network problem, check your network connection or contact us for problem. Email: subexchange@gmail.com")
    }
    
    return await response.json();
}

export async function skipVideo(googleUserId, videoId, activityType) {
  const data = new FormData();
  data.append("googleUserId", googleUserId);
  data.append("videoId", videoId)
  data.append("activityType", activityType)

  try {
    var response = await fetch(BACKEND_URL + "/skip-video", {
      method: "POST",
      body: data
    });
  } catch {
    throw new Error("Network problem, check your network connection or contact us for problem. Email: subexchange@gmail.com")
  }
  
  return await response.json();
}

export async function loadVideo(googleUserId, additionalActivity) {
  const data = new FormData();
  data.append("googleUserId", googleUserId);
  data.append("additionalActivity", additionalActivity)

  try {
    var response = await fetch(BACKEND_URL + "/get-video", {
      method: "POST",
      body: data
    });
  } catch {
    throw new Error("Network problem, check your network connection or contact us for problem. Email: subexchange@gmail.com")
  }

  return await response.json();
}

export async function getVideoReward(googleUserId, activityType, didGetDoubleCoin) {
  const data = new FormData();
  data.append("googleUserId", googleUserId);
  data.append("activityType", activityType)
  data.append("didGetDoubleCoin", didGetDoubleCoin)

  try {
    var response = await fetch(BACKEND_URL + "/get-video-reward", {
      method: "POST",
      body: data
    });
  } catch {
    throw new Error("Network problem, check your network connection or contact us for problem. Email: subexchange@gmail.com")
  }

  return await response.json();
}

export async function interactVideo(googleUserId, videoId, activityType) {
  const data = new FormData();
  data.append("googleUserId", googleUserId);
  data.append("videoId", videoId)
  data.append("activityType", activityType)

  try {
    var response = await fetch(BACKEND_URL + "/interact-video", {
      method: "POST",
      body: data
    });
  } catch {
    throw new Error("Network problem, check your network connection or contact us for problem. Email: subexchange@gmail.com")
  }
 
  return await response.json();
}

export async function getVideoBonus(googleUserId, didGetDoubleCoin) {
  const data = new FormData();
  data.append("googleUserId", googleUserId);
  data.append("didGetDoubleCoin", didGetDoubleCoin)

  try {
    var response = await fetch(BACKEND_URL + "/get-video-bonus", {
      method: "POST",
      body: data
    });
  } catch {
    throw new Error("Network problem, check your network connection or contact us for problem. Email: subexchange@gmail.com")
  }
  
  return await response.json();
}

export async function handleSignIn(authorization) {
  const data = new FormData();
  data.append("authorization", authorization);

  try {
    var response = await fetch(BACKEND_URL + "/sign-in", {
      method: "POST",
      body: data
    });
  } catch {
    throw new Error("Network problem, check your network connection or contact us for problem. Email: subexchange@gmail.com")
  }

  return await response.json();
}

export async function getCurrentVersion() {
  try {
    var response = await fetch(BACKEND_URL + "/get-current-version");
  } catch(error) {
    // console.error(error)
    throw new Error("Network problem, check your network connection or contact us for problem. Email: subexchange@gmail.com")
  }

  return await response.json();
}

export async function inputReferralCode(googleUserId, referralCode) {
  const data = new FormData();
  data.append("googleUserId", googleUserId);
  data.append("referralCode", referralCode);

  try {
    var response = await fetch(BACKEND_URL + "/referral-code-input", {
      method: "POST",
      body: data
    });
  } catch {
    throw new Error("Network problem, check your network connection or contact us for problem. Email: subexchange@gmail.com")
  }

  return await response.json();
}

export async function trackWatchedVideoStatistic(googleUserId) {
  const data = new FormData();
  data.append("googleUserId", googleUserId);

  try {
    var response = await fetch(BACKEND_URL + "/track-watched-video-statistic", {
      method: "POST",
      body: data
    });
  } catch {
    throw new Error("Network problem, check your network connection or contact us for problem. Email: subexchange@gmail.com")
  }

  return await response.json();
}

export async function checkVideoCompletion(googleUserId) {
  const data = new FormData();
  data.append("googleUserId", googleUserId);

  try {
    var response = await fetch(BACKEND_URL + "/check-video-complete", {
      method: "POST",
      body: data
    });
  } catch {
    throw new Error("Network problem, check your network connection or contact us for problem. Email: subexchange@gmail.com")
  }

  return await response.json();
}