{{- define "mern-backend.name" -}}
mern-backend
{{- end }}

{{- define "mern-backend.fullname" -}}
{{ .Release.Name }}-mern-backend
{{- end }}