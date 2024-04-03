import { Text, View } from "@/components/Themed";
import { Environment, useGLTF } from "@react-three/drei/native";
import { Canvas, useFrame } from "@react-three/fiber/native";
import { Asset } from "expo-asset";
import { Suspense } from "react";
import { StyleSheet } from "react-native";
import usePromise from "react-promise-suspense";

const getUrl = async () => {
  const asset = Asset.fromModule(require("@/assets/3dObjects/iphone.glb"));
  await asset.downloadAsync();
  return asset.localUri;
};

function IPhoneModel() {
  const url = usePromise(getUrl, []) ?? "";
  const { scene } = useGLTF(url);
  useFrame(() => (scene.rotation.y += 0.01));
  return <primitive object={scene} />;
}

export default function TabOneScreen() {
  // TODO: figure out how to work with glb file
  return (
    <View style={styles.container}>
      <Text style={styles.title}>R3f with imported iPhone.glb Screen</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.innerWrapper}>
        <Canvas camera={{ position: [-6, 0, 16], fov: 36 }}>
          <color attach="background" args={[0xe2f4df]} />
          <ambientLight />
          <directionalLight intensity={1.1} position={[0.5, 0, 0.866]} />
          <directionalLight intensity={0.8} position={[-6, 2, 2]} />
          <Suspense>
            <Environment preset="park" />
            <IPhoneModel />
          </Suspense>
        </Canvas>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  innerWrapper: {
    display: "flex",
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
