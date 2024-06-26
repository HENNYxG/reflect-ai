//Dynamically gives us current url
const createURL = (path) => {
    return window.location.origin + path
}

export const createNewEntry = async () => {
    const res = await fetch(
        new Request(createURL('/api/journal'), {
        method: 'POST',
    })
    )

    if (res.ok) {
        const data = await res.json()
        return data.data
    } else {
    throw new Error('Something went wrong on API server!')
  }
}

export const updateEntry = async (id, content) => {
    const res = await fetch(new Request(createURL(`/api/journal/${id}`),
        {
         method: 'PATCH',
         body: JSON.stringify({ content }),
        })
    )

    if (res.ok) {
        const data = await res.json()
        console.log("DATA WAS PUSHED")
        return data.data
    } else {
    throw new Error('Something went wrong on API server!')
  }
}

export const askQuestion = async (question) => {
    const res = await fetch(new Request(createURL(`/api/question`),
        {
         method: 'POST',
         body: JSON.stringify({ question }),
        })
    )

    if (res.ok) {
        const data = await res.json()
        return data.data
    } else {
    throw new Error('Something went wrong on API server!')
  }
}
