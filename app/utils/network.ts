export const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args)
        .then((res) => {
            if (res.status === 200) {
                return res;
            } else {
                throw res;
            }
        })
        .then((res) => res.json());
