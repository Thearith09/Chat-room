import { ref, watchEffect } from "vue";
import { projectFirestore } from "../firebase/config";

const getCollection = (collection) => {
    const documents = ref(null);
    const error = ref(null);

    let collectionRef = projectFirestore.collection(collection)
        .orderBy("createdAt");

    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
        console.log("snapshort");
        let results = [];
        snapshot.docs.forEach((doc) => {
            doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
        });

        documents.value = results;
        error.value = null;

    }, (err) => {
        documents.value = null;
        error.value = err.message;
    });

    watchEffect((onInvalidate) => {
        //onInvalidate for unmounted
        //unsubscribe from previous collection when watcher is stopped(componenet unmounted)
        onInvalidate(() => unsubscribe());
    });

    return { error, documents };
};

export default getCollection;