<template>
    <v-card-text class="projects">
        <h1 class="subtitle-1 grey--text">Projects</h1>


        <v-container class="my-5">
            <v-expansion-panels>
                <v-expansion-panel v-for="project in myProjects" :key="project.title">
                    <v-expansion-panel-header>{{ project.title }}</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-card flat>
                            <v-card-text class="px-4 grey--text">
                                <v-row>
                                    <v-col cols=8>
                                        <div class="font-weight-bold">due by {{ project.due }}</div>
                                        <div>{{ project.content }}</div>
                                    </v-col>
                                    <v-col cols-4>
                                        <v-form class="px-3" ref="removeForm">
                                            <v-btn text color="red" @click="removeProject(project.id)">
                                                <v-icon left>mdi-delete</v-icon>
                                                <span>Remove</span>
                                            </v-btn>
                                        </v-form>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-container>
        
    </v-card-text>
</template>

<script>
import db from '@/fb'
export default {
    props: ['teamData'],
    data() {
        return {
            projects: []
        }
    },
    computed: {
        myProjects() {
            return this.projects.filter(project => {
                return project.person === this.teamData[0].name
            })
        }
    },
    created() {
        db.collection('projects').onSnapshot(res => {
            console.log();
            const changes = res.docChanges();
            changes.forEach(change => {
                if (change.type === 'added') {
                    this.projects.push({
                        ...change.doc.data(),
                        id: change.doc.id
                    })
                } else if (change.type === 'removed') {
                    this.projects = this.projects.filter(function(n) { return n.id !== change.doc.id; });
                }
            })
        })
    },
    methods: {
        removeProject(id) {
            if (this.$refs.removeForm) {
                db.collection("projects").doc(id).delete().then(function() {
                    // this.$emit('projectAdded');
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
            }
        }
    }

}
</script>