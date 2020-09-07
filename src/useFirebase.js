import { useState, useEffect, useCallback } from "react";
import { firestore, collectionToObject } from "./firebase";

export function useFirebaseCollection(collection) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const response = await firestore.collection(collection).get();

        setData(collectionToObject(response));
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, []);

  const add = useCallback(
    async (obj) => {
      const addId = await firestore.collection(collection).add(obj);
      setData([...data, { ...obj, id: addId.id }]);
    },
    [data]
  );

  const update = useCallback(
    async (id, fields) => {
      await firestore.collection(collection).doc(id).update(fields);
      const updateIndex = data.findIndex((u) => u.id === id);

      setData([
        ...data.slice(0, updateIndex),
        { ...data[updateIndex], ...fields },
        ...data.slice(updateIndex + 1),
      ]);
    },
    [data]
  );

  const remove = useCallback(
    async (docId) => {
      await firestore.collection(collection).doc(docId).delete();
      setData(data.filter((r) => r.id !== docId));
    },
    [data]
  );

  return { data, error, isLoading, add, update, remove };
}
