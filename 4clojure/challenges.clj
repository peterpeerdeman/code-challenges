(ns clojure-testground
  (:use clojure.test))

(defn last-element [arr]
  (first (reverse arr)))

(deftest last-element-test
  (is (= 3 (last-element [1 2 3]))))

(defn second-last-element [arr]
  (let [[head & tail] (reverse arr)]
    (first tail)))

(deftest second-last-element-test
  (is (= 3 (second-last-element [1 2 3 4] )))
  (is (= "b" (second-last-element ["a" "b" "c"] ))))

(defn nth-element [n arr]
  (loop [iteration n
         current arr]
      (if (zero? iteration)
        (first current)
        (recur (dec iteration) (rest current)))))

(deftest nth-element-test
  (is (= 3 (nth-element 2 [1 2 3 4] )))
  (is (= 2 (nth-element 1 [1 2 3 4] )))
  (is (= "b" (nth-element 1 ["a" "b" "c"] ))))

(defn count-elements [sequence]
  (reduce
   (fn [c _]
     (inc c))
    0
    sequence))

(deftest count-elements-test
  (is (= 3 (count-elements [1 2 3])))
  (is (= 1 (count-elements [:a]))))

(defn only-odd [seq]
  (filter #(= 1 (mod % 2)) seq))

(only-odd [1 2 3 4])

(deftest only-odd-test
  (is (= [1 3] (only-odd [1 2 3 4]))))

;# currently at http://www.4clojure.com/problem/25
