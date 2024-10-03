const baseURL = "http://192.168.11.103:8080/api"

export async function fetchEarningHistories(googleUserId) {
    const params = new URLSearchParams();
    params.append("googleUserId", googleUserId);
  
    const response = await fetch(baseURL + "/get-earning-histories?" + params, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  
    const data = await response.json();
    return data;
}

export async function fetchUserInfo(googleUserId) {
    const params = new URLSearchParams();
    params.append("googleUserId", googleUserId);
  
    const response = await fetch(baseURL + "/get-user-info?" + params, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  
    const data = await response.json();
    return data;
}
  
export async function fetchUploadedVideos(googleUserId) {
    const params = new URLSearchParams();
    params.append("googleUserId", googleUserId);
  
    const response = await fetch(baseURL + "/get-uploaded-videos?" + params, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  
    const data = await response.json();
    return data;
}

export async function fetchInvitationRecords(googleUserId) {
    const params = new URLSearchParams();
    params.append("googleUserId", googleUserId);
  
    const response = await fetch(baseURL + "/get-invitation-records?" + params, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  
    const data = await response.json();
    return data;
}

export async function deleteVideo(googleUserId, videoId, ) {
    const params = new URLSearchParams();
    params.append("googleUserId", googleUserId);
    params.append("videoId", videoId)

    const response = await fetch(baseURL + "/delete-video?" + params, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  
    const data = await response.json();
    return data;
}

export async function uploadVideo(googleUserId, ytVideoId, desiredView, additionalActivity, desiredAdditionalActivityAmount, timePerView) {
    const params = new URLSearchParams();
    params.append("googleUserId", googleUserId);
    params.append("ytVideoId", ytVideoId)
    params.append("desiredView", desiredView)
    params.append("additionalActivity", additionalActivity)
    params.append("desiredAdditionalActivityAmount", desiredAdditionalActivityAmount)
    params.append("timePerView", timePerView)

    const response = await fetch(baseURL + "/upload-video?" + params, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  
    const data = await response.json();
    return data;
}

export async function skipVideo(googleUserId, videoId, activityType) {
  const params = new URLSearchParams();
  params.append("googleUserId", googleUserId);
  params.append("videoId", videoId)
  params.append("activityType", activityType)

  const response = await fetch(baseURL + "/skip-video?" + params, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
}

export async function getVideo(googleUserId, additionalActivity) {
  const params = new URLSearchParams();
  params.append("googleUserId", googleUserId);
  params.append("additionalActivity", additionalActivity)

  const response = await fetch(baseURL + "/get-video?" + params, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
}