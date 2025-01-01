import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        zadanie4_1();
        zadanie4_2();
        zadanie4_3();
    }

    public static void zadanie4_1() {
        try {
            File myObj = new File("C:\\Users\\Dawid\\Desktop\\sprawdzanie zadan z palacza\\MaturaRoz4\\przyklad.txt");
            Scanner myReader = new Scanner(myObj);
            int i = 0;
            boolean pierwsza = false;
            while (myReader.hasNextLine()) {
                String data = myReader.nextLine();
                int liczba = Integer.parseInt(data);
                int PierwszaCyfra;
                int DrugaCyfra = liczba % 10;
                while (liczba >= 10) {
                    liczba /= 10;
                }

                PierwszaCyfra = liczba;

                if (PierwszaCyfra == DrugaCyfra) {
                    if (!pierwsza) {
                        pierwsza = true;
                        System.out.println("Pierwszą taką liczbą jest: " + Integer.parseInt(data));
                    }
                    i++;
                }
            }
            myReader.close();
            System.out.println("Takich liczb jest: " + i);
        } catch (FileNotFoundException e) {
            System.out.println("Nie znaleziono pliku");
            e.printStackTrace();
        }
    }

    public static void zadanie4_2() {
        try {
            File myObj = new File("C:\\Users\\Dawid\\Desktop\\sprawdzanie zadan z palacza\\MaturaRoz4\\przyklad.txt");
            Scanner myReader = new Scanner(myObj);

            int maxLiczbaCzynnikow = 0;
            int maxLiczbaRoznychCzynnikow = 0;
            int liczbaNajwiecejCzynnikow = 0;
            int liczbaNajwiecejRoznychCzynnikow = 0;

            while (myReader.hasNextLine()) {
                String data = myReader.nextLine();
                int liczba = Integer.parseInt(data);

                int liczbaCzynnikow = ileCzynnikow(liczba);
                int liczbaRoznychCzynnikow = ileRoznychCzynnikow(liczba);

                if (liczbaCzynnikow > maxLiczbaCzynnikow) {
                    maxLiczbaCzynnikow = liczbaCzynnikow;
                    liczbaNajwiecejCzynnikow = liczba;
                }

                if (liczbaRoznychCzynnikow > maxLiczbaRoznychCzynnikow) {
                    maxLiczbaRoznychCzynnikow = liczbaRoznychCzynnikow;
                    liczbaNajwiecejRoznychCzynnikow = liczba;
                }
            }
            myReader.close();

            System.out.println("Liczba z najwieksza liczba czynnikow pierwszych: " + liczbaNajwiecejCzynnikow + " (" + maxLiczbaCzynnikow + ")");
            System.out.println("Liczba z najwieksza liczba roznych czynnikow pierwszych: " + liczbaNajwiecejRoznychCzynnikow + " (" + maxLiczbaRoznychCzynnikow + ")");
        } catch (FileNotFoundException e) {
            System.out.println("Nie znaleziono pliku");
            e.printStackTrace();
        }
    }

    public static int ileCzynnikow(int liczba) {
        int licznik = 0;
        int dzielnik = 2;
        while (liczba > 1) {
            if (liczba % dzielnik == 0) {
                licznik++;
                liczba /= dzielnik;
            } else {
                dzielnik++;
            }
        }
        return licznik;
    }

    public static int ileRoznychCzynnikow(int liczba) {
        int licznik = 0;
        int dzielnik = 2;
        while (liczba > 1) {
            boolean jestCzynnikiem = false;
            while (liczba % dzielnik == 0) {
                liczba /= dzielnik;
                jestCzynnikiem = true;
            }
            if (jestCzynnikiem) {
                licznik++;
            }
            dzielnik++;
        }
        return licznik;
    }

    public static void zadanie4_3() {
        int liczbaDobrychTrojki = 0;
        int liczbaDobrychPiatek = 0;

        try {
            File myObj = new File("C:\\Users\\Dawid\\Desktop\\sprawdzanie zadan z palacza\\MaturaRoz4\\przyklad.txt");
            Scanner myReader = new Scanner(myObj);
            List<Integer> liczby = new ArrayList<>();

            while (myReader.hasNextLine()) {
                int liczba = Integer.parseInt(myReader.nextLine());
                liczby.add(liczba);
            }
            myReader.close();



            List<String> trojki = new ArrayList<>();

            //znajduje dobre trójki
            for (int i = 0; i < liczby.size(); i++) {
                for (int j = 0; j < liczby.size(); j++) {
                    for (int k = 0; k < liczby.size(); k++) {
                        if (i != j && j != k && i != k) {
                            int x = liczby.get(i);
                            int y = liczby.get(j);
                            int z = liczby.get(k);
                            if (y % x == 0 && z % y == 0) {
                                liczbaDobrychTrojki++;
                                trojki.add(x + " " + y + " " + z);
                            }
                        }
                    }
                }
            }


            //tu zapisuje dobre trójki do plikuu
            try {
                PrintWriter writer = new PrintWriter("trojki.txt");
                for (String trojka : trojki) {
                    writer.println(trojka);
                }
                writer.close();
            } catch (FileNotFoundException e) {
                System.out.println("Nie moge zapisac do pliku trojki.txt");
                e.printStackTrace();
            }
            System.out.println("Liczba dobrych trojek: " + liczbaDobrychTrojki);


            //tu znajduje sobie dobre piątki
            for (int u = 0; u < liczby.size(); u++) {
                for (int w = u + 1; w < liczby.size(); w++) {
                    if (liczby.get(w) % liczby.get(u) != 0) continue;
                    for (int x = w + 1; x < liczby.size(); x++) {
                        if (liczby.get(x) % liczby.get(w) != 0) continue;
                        for (int y = x + 1; y < liczby.size(); y++) {
                            if (liczby.get(y) % liczby.get(x) != 0) continue;
                            for (int z = y + 1; z < liczby.size(); z++) {
                                if (liczby.get(z) % liczby.get(y) == 0) {
                                    liczbaDobrychPiatek++;
                                }
                            }
                        }
                    }
                }
            }

            System.out.println("Liczba dobrych piatek: " + liczbaDobrychPiatek);





        } catch (FileNotFoundException e) {
            System.out.println("Nie znaleziono pliku");
            e.printStackTrace();
        }

    }

}
