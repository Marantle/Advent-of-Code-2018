package main

import (
	"fmt"
	"io/ioutil"
	"path/filepath"
	"sort"
	"strings"
	"time"
)

type Moment struct {
	Timestamp int64  `json:"time"`
	Minute    int    `json:"minute"`
	Msg       string `json:"msg"`
}

type Guard struct {
	Id int `json:"id"`
}

func main() {
	absPath, _ := filepath.Abs("./input.txt")
	b, err := ioutil.ReadFile(absPath) // just pass the file name
	layout := "2006-01-02 15:04"
	if err != nil {
		fmt.Print(err)
	}

	str := string(b) // convert content to a 'string'

	split := strings.Split(str, "\r")

	moments := []Moment{}
	for _, line := range split {

		s := strings.Split(line, "]")
		t, msg := s[0], s[1]
		shiftTime, err := time.Parse(layout, strings.TrimSpace(t[strings.Index(t, "[")+1:len(t)]))
		_, min, _ := shiftTime.Clock()
		moment := new(Moment)
		moment.Minute = min
		moment.Timestamp = shiftTime.UnixNano() / int64(time.Millisecond)
		moment.Msg = strings.TrimSpace(msg)
		moments = append(moments, *moment)
		if err != nil {
			fmt.Println(err)
		}
	}
	sort.Slice(moments, func(i, j int) bool {
		return moments[i].Timestamp < moments[j].Timestamp
	})

	for _, line := range moments {

		if strings.Contains(line.Msg, "begins shift") {
			guards[line.Msg] = line.Msg
			fmt.Println(line.Msg)
		}
	}
}
