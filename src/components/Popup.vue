<template>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn text class="success" v-on="on">Add New Project</v-btn>
      </template>
      <v-card>
        <v-card-title>
            <h2>Add a New Project</h2>
        </v-card-title>
        <v-card-text>
            <v-form class="px-3" ref="form">
                <v-text-field label="title" v-model="title" prepend-icon="mdi-folder" :rules="inputRules"></v-text-field>
                <v-textarea label="information" v-model="content" prepend-icon="mdi-pencil" :rules="inputRules"></v-textarea>

                <v-menu max-width="290">
                    <template v-slot:activator="{ on }">
                        <v-text-field :value="formattedDate" label="due date" prepend-icon="mdi-calendar-range" v-on="on" :rules="inputRules"></v-text-field>
                    </template>
                    <v-date-picker v-model="due"></v-date-picker>
                </v-menu>

                <v-spacer></v-spacer>

                <v-btn text class="success mx-0 mt-3" @click="submit" :loading="loading">Add Project</v-btn>
            </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>

<script>
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import db from '@/fb'

export default {
    props: ['teamData'],
    data() {
        return {
            dialog: false,
            title: '',
            content: '',
            due: null,
            inputRules: [
                v => v.length >= 3 || 'Minimum length is 3 characters'
            ],
            loading: false
        }
    },
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                this.loading = true;

                const project = {
                    title: this.title,
                    content: this.content,
                    due: format(parseISO(this.due), 'do MMM yyyy'),
                    person: this.teamData[0].name,
                    status: 'ongoing'
                }

                db.collection('projects').add(project).then(() => {
                    this.loading = false;
                    this.dialog = false;
                    this.$emit('projectAdded');
                })
            }
        }
    },
    computed: {
        formattedDate() {
            return this.due ? format(parseISO(this.due), 'do MMM yyyy') : '';
        }
    }
}
</script>