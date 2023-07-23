import {useState, useEffect, useRef} from "react";
import { SafeAreaView, ScrollView, Text,View, StyleSheet } from "react-native";
import Navbar from "../components/Navbar";
import {PageStyles} from "../assets/Styles";
import AppHeader from "../components/AppHeader";
import Post from "../components/Post";
import { getItemFromCache } from "../ReadCache";
import { TOKEN } from "../AsyncKeys";

export default function Home({route,navigation}){
    
    const scrollRef = useRef();
    const token = useRef();

    const [posts,setPosts] = useState([]);

    const [postComponents,setPostComponents] = useState();
    // Long poll for posts and set posts
    useEffect(() => {

        const getToken = async () => {
            token.current = await getItemFromCache(TOKEN);
        }

        const getPosts = () => {
            fetch(`${process.env.EXPO_PUBLIC_ENDPOINT}/posts`,{
                method: "GET",
                headers: {"Content-Type":"appllication/json",token:token.current}
            })
            .then(res => res.json())
            .then(data => {
                if(data.posts) setPosts(data.posts);
                // console.log(data);
            })
            .catch(e => console.log('err in Home',e));

        }
        const getData = async () => {
            if (!token.current) await getToken();
            getPosts();
        }
        getToken();
        getData();

        const interval = setInterval(getData, 120000); // Send request every 2 minutes

        return () => {
            clearInterval(interval); // Clean up the interval when component unmounts
        };

    },[])
    // Will run whenever the posts are set/changed
    useEffect(() => {
        const newPostComponents = posts.map((post,index) => 
            <Post key={index} id={post.u_id} body={post.body} images={post.images} date={post.date || "07/19/23"}/>
        );
        setPostComponents(newPostComponents);
    },[posts]);
    return (
        <SafeAreaView style={PageStyles.main}>
            <AppHeader route={route} action={() => navigation.navigate("NewPost")}/>
            <View style={PageStyles.contentWrap}>
                <ScrollView ref = {scrollRef} style={styles.scroll}>
                    {postComponents}
                    <View style = {styles.filler}/>
                </ScrollView>
                <Navbar route={route} scrollRef={scrollRef}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scroll: {
        flexGrow:1,
        paddingVertical: 30,
    },
    filler: {
        height: 100
    }
});