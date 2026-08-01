# OpenJDK Wiki and Source Reference Links

This file catalogs the canonical OpenJDK resources referenced in the JVM Internals document.

## Official Documentation Sites

- **OpenJDK project page**: <https://openjdk.org/>
- **OpenJDK JEPs**: <https://openjdk.org/jeps/>
- **HotSpot wiki**: <https://wiki.openjdk.org/display/HotSpot/Main>
- **OpenJDK source (read-only)**: <https://github.com/openjdk/jdk>
- **OpenJDK mailing lists**: <https://mail.openjdk.org/>

## HotSpot Subsystem Wiki Pages

These wiki pages document HotSpot's C++ subsystem structure. They are the authoritative reference for navigating the source tree.

| Subsystem | Wiki Page |
|-----------|-----------|
| Runtime | <https://wiki.openjdk.org/display/HotSpot/Threads> |
| Classloading | <https://wiki.openjdk.org/display/HotSpot/Class+Loading> |
| Interpreter | <https://wiki.openjdk.org/display/HotSpot/Template+Interpreter> |
| C1 Compiler (Client) | <https://wiki.openjdk.org/display/HotSpot/C1> |
| C2 Compiler (Server) | <https://wiki.openjdk.org/display/HotSpot/C2> |
| Garbage Collection — General | <https://wiki.openjdk.org/display/HotSpot/Garbage+Collection> |
| G1 | <https://wiki.openjdk.org/display/HotSpot/G1> |
| ZGC | <https://wiki.openjdk.org/display/HotSpot/ZGC> |
| Shenandoah | <https://wiki.openjdk.org/display/HotSpot/Shenandoah+GC> |
| Serviceability (JFR, JMX, JVMTI) | <https://wiki.openjdk.org/display/HotSpot/Serviceability> |
| Native Memory Tracking | <https://wiki.openjdk.org/display/HotSpot/Native+Memory+Tracking> |

## Source Tree Hot Spots

Key C++ source files in `src/hotspot/share/`:

| Component | Path |
|-----------|------|
| VM initialization | `runtime/thread.cpp`, `runtime/init.cpp` |
| Class loading | `classfile/classLoader.cpp`, `classfile/systemDictionary.cpp` |
| Interpreter entry points | `interpreter/templateTable.hpp`, `interpreter/interpreter.cpp` |
| Tiered compilation policy | `runtime/compilationPolicy.cpp` |
| C2 IR | `opto/` directory |
| GC root enumeration | `gc/shared/`, `gc/g1/`, `gc/z/` |
| G1 | `gc/g1/` directory (region-based) |
| ZGC | `gc/z/` directory (colored pointers) |
| Safepoint coordination | `runtime/safepoint.cpp` |
| Serviceability Agent | `services/` |
| JFR | `jfr/` |

## Specifications

- **The Java Virtual Machine Specification (JVMS)**: <https://docs.oracle.com/javase/specs/jvms/>
- **The Java Language Specification (JLS)**: <https://docs.oracle.com/javase/specs/jls/>
- **JMM (JSR-133)**: <https://www.cs.umd.edu/~pugh/java/memoryModel/jsr-133.pdf>
- **JNI Specification**: <https://docs.oracle.com/javase/8/docs/technotes/guides/jni/spec/jniTOC.html>
- **JVMTI Specification**: <https://docs.oracle.com/javase/8/docs/platform/jvmti/jvmti.html>
- **JMX Specification**: <https://docs.oracle.com/javase/8/docs/technotes/guides/jmx/>

## Vendor Documentation

- **Oracle JVM documentation (Java 21)**: <https://docs.oracle.com/en/java/javase/21/>
- **Oracle GC tuning guide**: <https://docs.oracle.com/en/java/javase/21/gctuning/>
- **Eclipse Adoptium (Temurin)**: <https://adoptium.net/>
- **Microsoft Build of OpenJDK**: <https://www.microsoft.com/openjdk/>
- **Amazon Corretto**: <https://aws.amazon.com/corretto/>
- **Azul Zulu / Zing**: <https://www.azul.com/>
- **BellSoft Liberica**: <https://bell-sw.com/>
- **Alibaba Dragonwell**: <https://github.com/alibaba/dragonwell>
- **Red Hat OpenJDK**: <https://developers.redhat.com/products/openjdk/>

## Diagnostic Tool Documentation

- **JFR**: <https://docs.oracle.com/en/java/javase/21/jfapi/>
- **JDK Mission Control (JMC)**: <https://jdk.java.io/jmc/>
- **jcmd**: <https://docs.oracle.com/en/java/javase/21/docs/specs/man/jcmd.html>
- **jmap**: <https://docs.oracle.com/en/java/javase/21/docs/specs/man/jmap.html>
- **jstack**: <https://docs.oracle.com/en/java/javase/21/docs/specs/man/jstack.html>
- **jstat**: <https://docs.oracle.com/en/java/javase/21/docs/specs/man/jstat.html>
- **jhsdb (Serviceability Agent)**: <https://docs.oracle.com/en/java/javase/21/docs/specs/man/jhsdb.html>
- **async-profiler**: <https://github.com/async-profiler/async-profiler>

## Community and Standards

- **Java Community Process (JCP)**: <https://jcp.org/>
- **JSR archive**: <https://www.jcp.org/en/jsr/all>
- **Java Language and VM Spec mailing list**: see OpenJDK mail archives

## Important CVE and Security References

- **Oracle Critical Patch Updates**: <https://www.oracle.com/security-alerts/>
- **OpenJDK Vulnerability Advisory**: <https://openjdk.org/groups/vulnerability/>
- **CVE database**: <https://cve.mitre.org/>