import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>LifeOS Canary — substrate validation build</Text>
      <Text style={styles.muted}>
        This canary IPA exists to prove the lifeos-devops EAS substrate
        (steps 1-10) executes end-to-end. It is not installed on any device.
      </Text>
      <StatusBar style="light" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#08080b",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  text: {
    color: "#e8e8eb",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  muted: {
    color: "#85858f",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
})
